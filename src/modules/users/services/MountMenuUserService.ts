import { inject, injectable, container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Menu from '@modules/users/infra/typeorm/entities/Menu';
import IMenusRepository from '@modules/users/repositories/IMenusRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import CheckPermissionService from '@modules/users/services/CheckPermissionService';

interface IRequest {
  role_id: number;
  user_id: number;
}

interface IMenu {
  id: number;
  parent_id?: number;
  method?: string;
  name: string;
  url?: string;
  permission: boolean;
  children?: IMenu[];
}

@injectable()
class MountMenuUserService {
  constructor(
    @inject('MenusRepository')
    private menusRepository: IMenusRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, role_id }: IRequest): Promise<IMenu[]> {
    const cacheKey = `menu-list`;
    let allMenus = await this.cacheProvider.recover<Menu[]>(cacheKey);

    allMenus = await this.menusRepository.findAll();
    await this.cacheProvider.save(cacheKey, classToClass(allMenus));

    const nestMenus = (menus: IMenu[], id: number | null = null): IMenu[] => {
      return menus
        .filter(menu => menu.parent_id === id)
        .map(menu => {
          let { permission } = menu;
          if (permission === false && !menu.url) {
            const linkedMenu = menus.filter(sub => {
              if (!sub.url) {
                if (sub.parent_id === menu.id) {
                  return true;
                }
              }
              return sub.parent_id === menu.id && sub.permission;
            });

            permission = linkedMenu.length > 0 ? true : permission;
          }
          return {
            ...menu,
            permission,
            children: nestMenus(menus, menu.id),
          };
        });
    };

    const checkPermission = container.resolve(CheckPermissionService);

    const checkMenuPermission = (menus: Menu[]) => {
      const promises = menus.map(async (menu): Promise<IMenu> => {
        const { method, controller, action } = menu;
        let originalUrl = controller ? `/${controller}/` : false;
        originalUrl =
          originalUrl && action ? `${originalUrl}${action}` : `${originalUrl}`;
        const url = controller ? `${originalUrl}` : undefined;
        const permission =
          method && originalUrl
            ? await checkPermission
                .execute({
                  method,
                  originalUrl,
                  role_id,
                  user_id,
                })
                .then(response => response.approved)
            : false;
        return {
          ...menu,
          url,
          permission: true,
        };
      });
      return Promise.all(promises);
    };

    const filterEmptyMenu = (menus: IMenu[]) => {
      return menus.filter(item => {
        if (item?.children?.length) {
          if (item.permission && item.children?.some(sub => sub.permission)) {
            return true;
          }
          return false;
        }
        return item.permission;
      });
    };

    const checkedMenus = await checkMenuPermission(allMenus);
    const menus = nestMenus(checkedMenus);
    const filterEmptyMenus = filterEmptyMenu(menus);
    return filterEmptyMenus;
  }
}

export default MountMenuUserService;
