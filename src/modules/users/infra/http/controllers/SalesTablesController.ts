import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@modules/users/services/SaleTable/CreateService';
import GetService from '@modules/users/services/SaleTable/GetService';
import UpdateService from '@modules/users/services/SaleTable/UpdateService';
import DeleteService from '@modules/users/services/SaleTable/DeleteService';
import ListService from '@modules/users/services/SaleTable/ListService';

export default class SaleTablesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listSaleTables = container.resolve(ListService);
    const salesTables = await listSaleTables.execute();

    return response.json(classToClass(salesTables));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, active } = request.body;
    const createSaleTable = container.resolve(CreateService);
    const saleTableCreate = await createSaleTable.execute({
      name,
      description,
      active,
    });

    return response.json(classToClass(saleTableCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getSaleTable = container.resolve(GetService);
    const saleTable = await getSaleTable.execute(Number(id));

    return response.json(classToClass(saleTable));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, active } = request.body;
    const updateSaleTable = container.resolve(UpdateService);
    const saleTableUpdate = await updateSaleTable.execute({
      id: Number(id),
      name,
      description,
      active,
    });

    return response.json(classToClass(saleTableUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteSaleTable = container.resolve(DeleteService);
    await deleteSaleTable.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'saleTable removed' });
  }
}
