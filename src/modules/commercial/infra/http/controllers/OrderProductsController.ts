import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/commercial/services/OrderProduct/ListService';
import CreateService from '@modules/commercial/services/OrderProduct/CreateService';
import UpdateService from '@modules/commercial/services/OrderProduct/UpdateService';
import GetService from '@modules/commercial/services/OrderProduct/GetService';
import DeleteService from '@modules/commercial/services/OrderProduct/DeleteService';

export default class OrderProductsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listOrderProducts = container.resolve(ListService);
    const orderProducts = await listOrderProducts.execute();
    return response.json(classToClass(orderProducts));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      order_id,
      product_id,
      initial_price,
      single_discount,
      total_discount,
      charged_value,
      cashback_value,
      taxes,
      quantity,
      wrap,
      released,
      cfop,
    } = request.body;
    const createOrderProduct = container.resolve(CreateService);

    const orderProduct = await createOrderProduct.execute({
      order_id,
      product_id,
      initial_price,
      single_discount,
      total_discount,
      charged_value,
      cashback_value,
      taxes,
      quantity,
      wrap,
      released,
      cfop,
    });

    return response.json(classToClass(orderProduct));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getOrderProduct = container.resolve(GetService);
    const orderProduct = await getOrderProduct.execute(Number(id));

    return response.json(classToClass(orderProduct));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      order_id,
      product_id,
      initial_price,
      single_discount,
      total_discount,
      charged_value,
      cashback_value,
      taxes,
      quantity,
      wrap,
      released,
      cfop,
    } = request.body;

    const updateOrderProduct = container.resolve(UpdateService);

    const orderProduct = await updateOrderProduct.execute({
      id: Number(id),
      order_id,
      product_id,
      initial_price,
      single_discount,
      total_discount,
      charged_value,
      cashback_value,
      taxes,
      quantity,
      wrap,
      released,
      cfop,
    });

    return response.json(classToClass(orderProduct));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteOrderProduct = container.resolve(DeleteService);
    await deleteOrderProduct.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Order product removed' });
  }
}
