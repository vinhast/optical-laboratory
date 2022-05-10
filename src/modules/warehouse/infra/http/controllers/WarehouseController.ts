import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateWarehouseService from '@modules/warehouse/services/Warehouse/CreateWarehouseService';
import GetWarehouseService from '@modules/warehouse/services/Warehouse/GetWarehouseService';
import UpdateWarehouseService from '@modules/warehouse/services/Warehouse/UpdateWarehouseService';
import DeleteWarehouseService from '@modules/warehouse/services/Warehouse/DeleteWarehouseService';
import ListWarehouseService from '@modules/warehouse/services/Warehouse/ListWarehouseService';

export default class WarehouseController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listWarehouses = container.resolve(ListWarehouseService);
    const warehouse = await listWarehouses.execute();

    return response.json(classToClass(warehouse));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, details, active } = request.body;
    const createWarehouse = container.resolve(CreateWarehouseService);
    const warehouse = await createWarehouse.execute({
      name,
      details,
      active,
    });

    return response.json(classToClass(warehouse));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getWarehouse = container.resolve(GetWarehouseService);
    const warehouse = await getWarehouse.execute(Number(id));

    return response.json(classToClass(warehouse));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, details, active } = request.body;
    const updateWarehouse = container.resolve(UpdateWarehouseService);
    const warehouse = await updateWarehouse.execute({
      id: Number(id),
      name,
      details,
      active,
    });

    return response.json(classToClass(warehouse));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteWarehouse = container.resolve(DeleteWarehouseService);
    await deleteWarehouse.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Warehouse removed' });
  }
}
