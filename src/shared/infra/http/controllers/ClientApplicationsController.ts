import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@shared/services/ClientApplication/CreateService';
import GetService from '@shared/services/ClientApplication/GetService';
import ListService from '@shared/services/ClientApplication/ListService';
import UpdateService from '@shared/services/ClientApplication/UpdateService';
import DeleteService from '@shared/services/ClientApplication/DeleteService';

export default class ClientApplicationsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listClientApplications = container.resolve(ListService);
    const clientApplications = await listClientApplications.execute();

    return response.json(classToClass(clientApplications));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      avatar,
      cnpj,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      phone,
      mobile,
    } = request.body;
    const createClientApplication = container.resolve(CreateService);

    const clientApplication = await createClientApplication.execute({
      name,
      email,
      avatar,
      cnpj,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      phone,
      mobile,
    });

    return response.json(classToClass(clientApplication));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getClientApplication = container.resolve(GetService);
    const clientApplication = await getClientApplication.execute(Number(id));

    return response.json(classToClass(clientApplication));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      email,
      cnpj,
      avatar,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      phone,
      mobile,
    } = request.body;
    const updateClientApplication = container.resolve(UpdateService);
    const clientApplication = await updateClientApplication.execute({
      id: Number(id),
      name,
      email,
      avatar,
      cnpj,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      phone,
      mobile,
    });

    return response.json(classToClass(clientApplication));
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteClientApplication = container.resolve(DeleteService);
    await deleteClientApplication.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Client application removed' });
  }
}
