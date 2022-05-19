import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/users/services/Menu/ListService';
import CreateService from '@modules/users/services/Menu/CreateService';
import UpdateService from '@modules/users/services/Menu/UpdateService';
import GetService from '@modules/users/services/Menu/GetService';
import DeleteService from '@modules/users/services/Menu/DeleteService';

export default class MenusController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listMenus = container.resolve(ListService);
    const menus = await listMenus.execute();

    return response.json(classToClass(menus));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { parent_id, name, controller, method, action, icon } = request.body;
    const createMenu = container.resolve(CreateService);
    const menu = await createMenu.execute({
      parent_id,
      icon,
      name,
      controller,
      method,
      action,
    });

    return response.json(classToClass(menu));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getMenu = container.resolve(GetService);
    const menu = await getMenu.execute(Number(id));

    return response.json(classToClass(menu));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { parent_id, name, controller, method, action, icon } = request.body;
    const updateMenu = container.resolve(UpdateService);
    const menu = await updateMenu.execute({
      id: Number(id),
      parent_id,
      icon,
      name,
      controller,
      method,
      action,
    });

    return response.json(classToClass(menu));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteMenu = container.resolve(DeleteService);
    await deleteMenu.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'menu removed' });
  }
}
