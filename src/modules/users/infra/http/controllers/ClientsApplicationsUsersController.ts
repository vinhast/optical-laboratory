import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@modules/users/services/ClientApplicationUser/CreateService';
import ListService from '@modules/users/services/ClientApplicationUser/ListService';
import ListByClientApplicationService from '@modules/users/services/ClientApplicationUser/ListByClientApplicationService';
import GetService from '@modules/users/services/ClientApplicationUser/GetService';
import UpdateService from '@modules/users/services/ClientApplicationUser/UpdateService';
import DeleteService from '@modules/users/services/ClientApplicationUser/DeleteService';

export default class ClientsApplicationsUsersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listClientsApplicationsUsers = container.resolve(ListService);
    const clientApplicationsUsers =
      await listClientsApplicationsUsers.execute();

    return response.json(classToClass(clientApplicationsUsers));
  }
  public async listByClientApplication(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { client_application_id } = request.params;
    const listClientsApplicationsUsers = container.resolve(
      ListByClientApplicationService,
    );
    const clientApplicationsUsers = await listClientsApplicationsUsers.execute(
      Number(client_application_id),
    );

    return response.json(classToClass(clientApplicationsUsers));
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      client_application_role_id,
      username,
      password,
      active,
      client_application_id,
      token_validate,
      token,
    } = request.body;
    const createClientApplicationUser = container.resolve(CreateService);

    const clientApplicationUser = await createClientApplicationUser.execute({
      client_application_role_id,
      username,
      password,
      active,
      client_application_id,
      token_validate,
      token,
    });

    return response.json(classToClass(clientApplicationUser));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getClientApplicationUser = container.resolve(GetService);
    const clientApplicationUser = await getClientApplicationUser.execute(
      Number(id),
    );

    return response.json(classToClass(clientApplicationUser));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      client_application_role_id,
      username,
      password,
      active,
      client_application_id,
      token_validate,
      token,
    } = request.body;
    const updateClientApplicationUser = container.resolve(UpdateService);
    const clientApplicationUser = await updateClientApplicationUser.execute({
      id: Number(id),
      client_application_role_id,
      username,
      password,
      active,
      client_application_id,
      token_validate,
      token,
    });

    return response.json(classToClass(clientApplicationUser));
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id, client_application_id } = request.params;
    const deleteClientApplicationUser = container.resolve(DeleteService);
    await deleteClientApplicationUser.execute({
      id: Number(id),
      client_application_id: Number(client_application_id),
    });

    return response
      .status(204)
      .json({ message: 'Client application user removed' });
  }
}
