import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/warehouse/services/Service/ListService';
import CreateService from '@modules/warehouse/services/Service/CreateService';
import UpdateService from '@modules/warehouse/services/Service/UpdateService';
import GetService from '@modules/warehouse/services/Service/GetService';
import DeleteService from '@modules/warehouse/services/Service/DeleteService';

export default class ServicesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listServices = container.resolve(ListService);
    const services = await listServices.execute();

    return response.json(classToClass(services));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { price, active } = request.body;

    const createService = container.resolve(CreateService);
    const service = await createService.execute({
      price,
      active,
    });

    return response.json(classToClass(service));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getService = container.resolve(GetService);
    const service = await getService.execute(Number(id));
    return response.json(classToClass(service));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { price, active } = request.body;
    const { id } = request.params;
    const updateService = container.resolve(UpdateService);

    const service = await updateService.execute({
      id: Number(id),
      price,
      active,
    });

    return response.json(classToClass(service));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteService = container.resolve(DeleteService);
    await deleteService.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Service removed' });
  }
}
