import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@modules/users/services/SaleTablePriceService/CreateService';
import GetService from '@modules/users/services/SaleTablePriceService/GetService';
import UpdateService from '@modules/users/services/SaleTablePriceService/UpdateService';
import DeleteService from '@modules/users/services/SaleTablePriceService/DeleteService';
import ListService from '@modules/users/services/SaleTablePriceService/ListService';

export default class SalesTablesPricesServicesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listSaleTablePriceServices = container.resolve(ListService);
    const salesTablesPricesServices =
      await listSaleTablePriceServices.execute();

    return response.json(classToClass(salesTablesPricesServices));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { service_id, table_id, price } = request.body;
    const createSaleTablePriceService = container.resolve(CreateService);
    const saleTablePriceServiceCreate =
      await createSaleTablePriceService.execute({
        service_id,
        table_id,
        price,
        user_id: request.user.id,
      });

    return response.json(classToClass(saleTablePriceServiceCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getSaleTablePriceService = container.resolve(GetService);
    const saleTablePriceService = await getSaleTablePriceService.execute(
      Number(id),
    );

    return response.json(classToClass(saleTablePriceService));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { service_id, table_id, price } = request.body;
    const updateSaleTablePriceService = container.resolve(UpdateService);
    const saleTablePriceServiceUpdate =
      await updateSaleTablePriceService.execute({
        id: Number(id),
        service_id,
        table_id,
        price,
        user_id: request.user.id,
      });

    return response.json(classToClass(saleTablePriceServiceUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteSaleTablePriceService = container.resolve(DeleteService);
    await deleteSaleTablePriceService.execute({
      id: Number(id),
    });

    return response
      .status(204)
      .json({ message: 'saleTablePriceService removed' });
  }
}
