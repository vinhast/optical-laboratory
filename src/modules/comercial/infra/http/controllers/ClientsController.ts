import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateClientService from '@modules/comercial/services/Client/CreateClientService';
import GetClientService from '@modules/comercial/services/Client/GetClientService';
import UpdateClientService from '@modules/comercial/services/Client/UpdateClientService';
import DeleteClientService from '@modules/comercial/services/Client/DeleteClientService';
import ListClientsService from '@modules/comercial/services/Client/ListClientsService';

export default class ClientsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listClients = container.resolve(ListClientsService);
    const clietns = await listClients.execute();

    return response.json(classToClass(clietns));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj, company_name, table_id } = request.body;
    const createClient = container.resolve(CreateClientService);
    const client = await createClient.execute({
      cnpj,
      company_name,
      table_id,
    });

    return response.json(classToClass(client));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getClient = container.resolve(GetClientService);
    const client = await getClient.execute(Number(id));

    return response.json(classToClass(client));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { cnpj, company_name, table_id } = request.body;
    const updateClient = container.resolve(UpdateClientService);
    const client = await updateClient.execute({
      id: Number(id),
      cnpj,
      company_name,
      table_id,
    });

    return response.json(classToClass(client));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteClient = container.resolve(DeleteClientService);
    await deleteClient.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Client removed' });
  }
}
