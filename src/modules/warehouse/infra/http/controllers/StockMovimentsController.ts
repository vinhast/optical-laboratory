import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/warehouse/services/StockMoviment/ListService';
import CreateService from '@modules/warehouse/services/StockMoviment/CreateService';
import CreateManyService from '@modules/warehouse/services/StockMoviment/CreateManyService';
import UpdateService from '@modules/warehouse/services/StockMoviment/UpdateService';
import GetService from '@modules/warehouse/services/StockMoviment/GetService';
import DeleteService from '@modules/warehouse/services/StockMoviment/DeleteService';

export default class stockMovimentsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listStockMoviments = container.resolve(ListService);
    const stockMoviments = await listStockMoviments.execute();

    return response.json(classToClass(stockMoviments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      description,
      origin,
      product_id,
      quantity,
      type,
      user_id,
      financial_moviment_id,
      order_id,
    } = request.body;

    const createStockMoviment = container.resolve(CreateService);
    const stockMoviment = await createStockMoviment.execute({
      description,
      origin,
      product_id,
      quantity,
      type,
      user_id,
      financial_moviment_id,
      order_id,
    });

    return response.json(classToClass(stockMoviment));
  }

  public async addStock(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { stocks } = request.body;
    const getStockMoviment = container.resolve(CreateManyService);
    const stockMoviment = await getStockMoviment.execute({ stocks });
    return response.json(classToClass(stockMoviment));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getStockMoviment = container.resolve(GetService);
    const stockMoviment = await getStockMoviment.execute(Number(id));
    return response.json(classToClass(stockMoviment));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      description,
      origin,
      product_id,
      quantity,
      type,
      user_id,
      financial_moviment_id,
      order_id,
    } = request.body;
    const { id } = request.params;
    const updateStockMoviment = container.resolve(UpdateService);

    const stockMoviment = await updateStockMoviment.execute({
      id: Number(id),
      description,
      origin,
      product_id,
      quantity,
      type,
      user_id,
      financial_moviment_id,
      order_id,
    });

    return response.json(classToClass(stockMoviment));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteStockMoviment = container.resolve(DeleteService);
    await deleteStockMoviment.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Stock moviment removed' });
  }
}
