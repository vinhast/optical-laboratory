import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/warehouse/services/ProductUnitMeasured/ListService';
import CreateService from '@modules/warehouse/services/ProductUnitMeasured/CreateService';
import UpdateService from '@modules/warehouse/services/ProductUnitMeasured/UpdateService';
import GetService from '@modules/warehouse/services/ProductUnitMeasured/GetService';
import DeleteService from '@modules/warehouse/services/ProductUnitMeasured/DeleteService';

export default class ProductUnitMeasuredController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listUnitMeasured = container.resolve(ListService);
    const unitMeasured = await listUnitMeasured.execute();

    return response.json(classToClass(unitMeasured));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createUnitMeasured = container.resolve(CreateService);
    const unitMeasured = await createUnitMeasured.execute({
      name,
    });

    return response.json(classToClass(unitMeasured));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getUnitMeasured = container.resolve(GetService);
    const unitMeasured = await getUnitMeasured.execute(Number(id));

    return response.json(classToClass(unitMeasured));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;
    const updateUnitMeasured = container.resolve(UpdateService);
    const unitMeasured = await updateUnitMeasured.execute({
      id: Number(id),
      name,
    });

    return response.json(classToClass(unitMeasured));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUnitMeasured = container.resolve(DeleteService);
    await deleteUnitMeasured.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'unit measured removed' });
  }
}
