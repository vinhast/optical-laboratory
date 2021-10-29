import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/User/CreateUserService';
import GetUserService from '@modules/users/services/User/GetUserService';
import UpdateUserService from '@modules/users/services/User/UpdateUserService';
import DeleteUserService from '@modules/users/services/User/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { role_id, name, username, email, password, active } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      role_id,
      name,
      username,
      email,
      password,
      active,
    });

    return response.json(classToClass(user));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute(Number(id));

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, role_id, email, username, password, active } = request.body;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({
      id: Number(id),
      name,
      role_id,
      email,
      username,
      active,
      password,
    });

    return response.json(classToClass(user));
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'user removed' });
  }
}
