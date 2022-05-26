import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@modules/users/services/SaleTablePrice/CreateService';
import GetService from '@modules/users/services/SaleTablePrice/GetService';
import UpdateService from '@modules/users/services/SaleTablePrice/UpdateService';
import DeleteService from '@modules/users/services/SaleTablePrice/DeleteService';
import ListService from '@modules/users/services/SaleTablePrice/ListService';

export default class SalesTablesPricesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listSaleTablePrices = container.resolve(ListService);
    const salesTablesPrices = await listSaleTablePrices.execute();

    return response.json(classToClass(salesTablesPrices));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { product_category_id, table_id, unit_price, wholesale_price } =
      request.body;
    const createSaleTablePrice = container.resolve(CreateService);
    const saleTablePriceCreate = await createSaleTablePrice.execute({
      product_category_id,
      table_id,
      unit_price,
      wholesale_price,
      user_id: request.user.id,
    });

    return response.json(classToClass(saleTablePriceCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getSaleTablePrice = container.resolve(GetService);
    const saleTablePrice = await getSaleTablePrice.execute(Number(id));

    return response.json(classToClass(saleTablePrice));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { product_category_id, table_id, unit_price, wholesale_price } =
      request.body;
    const updateSaleTablePrice = container.resolve(UpdateService);
    const saleTablePriceUpdate = await updateSaleTablePrice.execute({
      id: Number(id),
      product_category_id,
      table_id,
      unit_price,
      wholesale_price,
      user_id: request.user.id,
    });

    return response.json(classToClass(saleTablePriceUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteSaleTablePrice = container.resolve(DeleteService);
    await deleteSaleTablePrice.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'saleTablePrice removed' });
  }
}
