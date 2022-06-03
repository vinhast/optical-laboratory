import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListByClientApplicationService from '@modules/users/services/ClientApplicationRole/ListByClientApplicationService';

export default class ClientsApplicationRolesController {
  public async listByClientApplication(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { client_application_id } = request.params;
    const listClientsApplicationRoles = container.resolve(
      ListByClientApplicationService,
    );
    const clientApplicationsUsers = await listClientsApplicationRoles.execute(
      Number(client_application_id),
    );

    return response.json(classToClass(clientApplicationsUsers));
  }
}
