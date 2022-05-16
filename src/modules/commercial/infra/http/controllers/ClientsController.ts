import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@modules/commercial/services/Client/CreateService';
import GetService from '@modules/commercial/services/Client/GetService';
import UpdateService from '@modules/commercial/services/Client/UpdateService';
import DeleteService from '@modules/commercial/services/Client/DeleteService';
import ListService from '@modules/commercial/services/Client/ListService';

export default class ClientsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listClients = container.resolve(ListService);
    const clients = await listClients.execute();

    return response.json(classToClass(clients));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      table_id,
      company_name,
      company_social_name,
      cnpj,
      state_registration,
      city_registration,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      ibge,
      phone_1,
      phone_2,
      mobile,
      email,
      note,
      shipment_method,
      payment_method,
      active,
      cnpjSearch,
    } = request.body;
    const createClient = container.resolve(CreateService);
    const client = await createClient.execute({
      table_id,
      company_name,
      company_social_name,
      cnpj,
      state_registration,
      city_registration,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      ibge,
      phone_1,
      phone_2,
      mobile,
      email,
      note,
      shipment_method,
      payment_method,
      active,
      cnpjSearch,
    });

    return response.json(classToClass(client));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getClient = container.resolve(GetService);
    const client = await getClient.execute(Number(id));

    return response.json(classToClass(client));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      table_id,
      company_name,
      company_social_name,
      cnpj,
      state_registration,
      city_registration,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      ibge,
      phone_1,
      phone_2,
      mobile,
      email,
      note,
      shipment_method,
      payment_method,
      active,
    } = request.body;
    const updateClient = container.resolve(UpdateService);
    const client = await updateClient.execute({
      id: Number(id),
      table_id,
      company_name,
      company_social_name,
      cnpj,
      state_registration,
      city_registration,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      ibge,
      phone_1,
      phone_2,
      mobile,
      email,
      note,
      shipment_method,
      payment_method,
      active,
    });

    return response.json(classToClass(client));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteClient = container.resolve(DeleteService);
    await deleteClient.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Client removed' });
  }
}
