import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/FinancialMovimentOrder/ListService';
import CreateService from '@modules/financial/services/FinancialMovimentOrder/CreateService';
import UpdateService from '@modules/financial/services/FinancialMovimentOrder/UpdateService';
import GetService from '@modules/financial/services/FinancialMovimentOrder/GetService';
import DeleteService from '@modules/financial/services/FinancialMovimentOrder/DeleteService';

export default class FinancialMovimentsOrdersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listFinancialMovimentOrders = container.resolve(ListService);
    const financialMovimentsOrders =
      await listFinancialMovimentOrders.execute();

    return response.json(classToClass(financialMovimentsOrders));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { financial_moviment_id, order_id } = request.body;
    const createFinancialMovimentOrder = container.resolve(CreateService);
    const financialMovimentOrderCreate =
      await createFinancialMovimentOrder.execute({
        financial_moviment_id,
        order_id,
      });

    return response.json(classToClass(financialMovimentOrderCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getFinancialMovimentOrder = container.resolve(GetService);
    const financialMovimentOrder = await getFinancialMovimentOrder.execute(
      Number(id),
    );

    return response.json(classToClass(financialMovimentOrder));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { financial_moviment_id, order_id } = request.body;
    const updateFinancialMovimentOrder = container.resolve(UpdateService);
    const financialMovimentUpdate = await updateFinancialMovimentOrder.execute({
      id: Number(id),
      financial_moviment_id,
      order_id,
    });

    return response.json(classToClass(financialMovimentUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteFinancialMovimentOrder = container.resolve(DeleteService);
    await deleteFinancialMovimentOrder.execute({
      id: Number(id),
    });

    return response
      .status(204)
      .json({ message: 'financialMovimentOrder removed' });
  }
}
