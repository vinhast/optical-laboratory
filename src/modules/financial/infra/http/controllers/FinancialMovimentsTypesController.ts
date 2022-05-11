import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/FinancialMovimentType/ListService';
import CreateService from '@modules/financial/services/FinancialMovimentType/CreateService';
import UpdateService from '@modules/financial/services/FinancialMovimentType/UpdateService';
import GetService from '@modules/financial/services/FinancialMovimentType/GetService';
import DeleteService from '@modules/financial/services/FinancialMovimentType/DeleteService';

export default class FinancialMovimentsTypesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listFinancialMovimentTypes = container.resolve(ListService);
    const financialMovimentsTypes = await listFinancialMovimentTypes.execute();

    return response.json(classToClass(financialMovimentsTypes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id, financial_moviment_type_group_id, name } = request.body;
    const createFinancialMovimentType = container.resolve(CreateService);
    const financialMovimentTypeCreate =
      await createFinancialMovimentType.execute({
        product_id,
        financial_moviment_type_group_id,
        name,
      });

    return response.json(classToClass(financialMovimentTypeCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getFinancialMovimentType = container.resolve(GetService);
    const financialMovimentType = await getFinancialMovimentType.execute(
      Number(id),
    );

    return response.json(classToClass(financialMovimentType));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { product_id, financial_moviment_type_group_id, name } = request.body;
    const updateFinancialMovimentType = container.resolve(UpdateService);
    const financialMovimentUpdate = await updateFinancialMovimentType.execute({
      id: Number(id),
      product_id,
      financial_moviment_type_group_id,
      name,
    });

    return response.json(classToClass(financialMovimentUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteFinancialMovimentType = container.resolve(DeleteService);
    await deleteFinancialMovimentType.execute({
      id: Number(id),
    });

    return response
      .status(204)
      .json({ message: 'financialMovimentType removed' });
  }
}
