import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePermissionService from '@modules/users/services/Permission/CreatePermissionService';
import DeletePermissionService from '@modules/users/services/Permission/DeletePermissionService';
import GetPermissionService from '@modules/users/services/Permission/GetPermissionService';
import ListPermissionService from '@modules/users/services/Permission/ListPermissionService';
import UpdatePermissionService from '@modules/users/services/Permission/UpdatePermissionService';

export default class PermissionsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listPermission = container.resolve(ListPermissionService);
    const permission = await listPermission.execute();

    return response.json(classToClass(permission));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { base_url, description, method, name, path } = request.body;
    const createPermission = container.resolve(CreatePermissionService);

    const permission = await createPermission.execute({
      base_url,
      description,
      method,
      name,
      path,
    });

    return response.json(classToClass(permission));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getPermission = container.resolve(GetPermissionService);
    const permission = await getPermission.execute(Number(id));

    return response.json(classToClass(permission));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { base_url, description, method, name, path } = request.body;
    const updatePermission = container.resolve(UpdatePermissionService);
    const permission = await updatePermission.execute({
      base_url,
      description,
      id: Number(id),
      method,
      name,
      path,
    });

    return response.json(classToClass(permission));
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletePermission = container.resolve(DeletePermissionService);
    await deletePermission.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Permission removed' });
  }
}
