import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/commercial/services/Provider/ListService';
import CreateService from '@modules/commercial/services/Provider/CreateService';
import UpdateService from '@modules/commercial/services/Provider/UpdateService';
import GetService from '@modules/commercial/services/Provider/GetService';
import DeleteService from '@modules/commercial/services/Provider/DeleteService';

export default class ProvidersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listProviders = container.resolve(ListService);
    const providers = await listProviders.execute();

    return response.json(classToClass(providers));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      company_social_name,
      company_name,
      cnpj,
      phone,
      mobile,
      email,
      street,
      number,
      complement,
      district,
      zip_code,
      city,
      state,
      ibge,
      note,
      active,
    } = request.body;
    const createProvider = container.resolve(CreateService);

    const provider = await createProvider.execute({
      company_social_name,
      company_name,
      cnpj,
      phone,
      mobile,
      email,
      street,
      number,
      complement,
      district,
      zip_code,
      city,
      state,
      ibge,
      note,
      active,
    });

    return response.json(classToClass(provider));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getProvider = container.resolve(GetService);
    const provider = await getProvider.execute(Number(id));

    return response.json(classToClass(provider));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      company_social_name,
      company_name,
      cnpj,
      phone,
      mobile,
      email,
      street,
      number,
      complement,
      district,
      zip_code,
      city,
      state,
      ibge,
      note,
      active,
    } = request.body;

    const updateProvider = container.resolve(UpdateService);
    const provider = await updateProvider.execute({
      id: Number(id),
      company_social_name,
      company_name,
      cnpj,
      phone,
      mobile,
      email,
      street,
      number,
      complement,
      district,
      zip_code,
      city,
      state,
      ibge,
      note,
      active,
    });

    return response.json(classToClass(provider));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProvider = container.resolve(DeleteService);
    await deleteProvider.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Provider removed' });
  }
}
