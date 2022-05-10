import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/warehouse/services/UnitType/ListService';
import CreateService from '@modules/warehouse/services/UnitType/CreateService';
import UpdateService from '@modules/warehouse/services/UnitType/UpdateService';
import GetService from '@modules/warehouse/services/UnitType/GetService';
import DeleteService from '@modules/warehouse/services/UnitType/DeleteService';

export default class UnitTypesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listAttributes = container.resolve(ListService);
    const attributes = await listAttributes.execute();

    return response.json(classToClass(attributes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, abbreviation } = request.body;
    const createAttribute = container.resolve(CreateService);
    const attribute = await createAttribute.execute({
      name,
      abbreviation,
    });

    return response.json(classToClass(attribute));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getAttribute = container.resolve(GetService);
    const attribute = await getAttribute.execute(Number(id));

    return response.json(classToClass(attribute));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, abbreviation } = request.body;
    const { id } = request.params;
    const updateAttribute = container.resolve(UpdateService);
    const attribute = await updateAttribute.execute({
      id: Number(id),
      name,
      abbreviation,
    });

    return response.json(classToClass(attribute));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteAttribute = container.resolve(DeleteService);
    await deleteAttribute.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Unit type removed' });
  }
}
