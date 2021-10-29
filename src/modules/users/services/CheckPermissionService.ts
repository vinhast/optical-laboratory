import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Permission from '@modules/users/infra/typeorm/entities/Permission';
import Role from '@modules/users/infra/typeorm/entities/Role';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  role_id: number;
  user_id: number;
  method: string;
  originalUrl: string;
}

@injectable()
class CheckPermissionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    role_id,
    method,
    originalUrl,
  }: IRequest): Promise<boolean> {
    const notRuleRoutes = ['dashboard', 'profile', 'cache'];
    if (role_id === 1) {
      return true;
    }
    const [, baseUrl, path] = originalUrl.split('/');

    if (notRuleRoutes.includes(baseUrl)) {
      return true;
    }

    const cacheKeyPermission = `permission-router:${method}-${baseUrl}-${path}`;
    let permission = await this.cacheProvider.recover<Permission | undefined>(
      cacheKeyPermission,
    );
    if (!permission) {
      permission = await this.permissionsRepository.findByRoute({
        method,
        baseUrl: baseUrl.toUpperCase(),
        path: Number(path) ? undefined : path.toUpperCase(),
      });

      await this.cacheProvider.save(cacheKeyPermission, permission);
    }

    if (permission) {
      const cacheKeyRole = `role:${role_id}`;
      let role = await this.cacheProvider.recover<Role | undefined>(
        cacheKeyRole,
      );

      role = await this.rolesRepository.findById(role_id);
      if (!role) {
        await this.cacheProvider.save(cacheKeyRole, role);
      }

      const rolePermissions = role?.permissions?.map(
        rolePermission => rolePermission.id,
      );

      if (rolePermissions?.includes(permission.id)) {
        return true;
      }

      const cacheKeyUser = `user:${user_id}`;
      let user = await this.cacheProvider.recover<User | undefined>(
        cacheKeyUser,
      );

      if (user) {
        user = await this.usersRepository.findById(user_id);
        await this.cacheProvider.save(cacheKeyUser, user);
      }

      const userPermissions = user?.user_permissions.map(
        userPermission => userPermission.id,
      );

      if (userPermissions?.includes(permission.id)) {
        return true;
      }
    }
    return false;
  }
}

export default CheckPermissionService;
