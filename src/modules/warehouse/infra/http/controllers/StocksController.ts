import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/warehouse/services/Stock/ListService';
import DeleteService from '@modules/warehouse/services/Stock/DeleteService';

export default class StocksController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { empty, pending, sale } = request.query;

    const listStocks = container.resolve(ListService);
    const stocks = await listStocks.execute({
      empty: !!empty,
      pending: !!pending,
      sale: !!sale,
    });

    return response.json(classToClass(stocks));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteStocks = container.resolve(DeleteService);
    await deleteStocks.execute({ id: Number(id) });

    return response.status(204).json({ message: 'stock removed' });
  }
}
