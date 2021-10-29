import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRoleService from '@modules/users/services/Role/CreateRoleService';
import GetRoleService from '@modules/users/services/Role/GetRoleService';
import UpdateRoleService from '@modules/users/services/Role/UpdateRoleService';
import DeleteRoleService from '@modules/users/services/Role/DeleteRoleService';
import ListRoleService from '@modules/users/services/Role/ListRoleService';

export default class RolesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listRoles = container.resolve(ListRoleService);
    const roles = await listRoles.execute();

    return response.json(classToClass(roles));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, permissions } = request.body;
    const createRole = container.resolve(CreateRoleService);
    const role = await createRole.execute({
      name,
      description,
      permissions,
    });

    return response.json(classToClass(role));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getRole = container.resolve(GetRoleService);
    const role = await getRole.execute(Number(id));

    return response.json(classToClass(role));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;
    const updateRole = container.resolve(UpdateRoleService);
    const role = await updateRole.execute({
      id: Number(id),
      name,
      description,
    });

    return response.json(classToClass(role));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteRole = container.resolve(DeleteRoleService);
    await deleteRole.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'role removed' });
  }
}
