import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/FinancialMovimentTypeGroup/ListService';
import CreateService from '@modules/financial/services/FinancialMovimentTypeGroup/CreateService';
import UpdateService from '@modules/financial/services/FinancialMovimentTypeGroup/UpdateService';
import GetService from '@modules/financial/services/FinancialMovimentTypeGroup/GetService';
import DeleteService from '@modules/financial/services/FinancialMovimentTypeGroup/DeleteService';

export default class FinancialMovimentsTypesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listFinancialMovimentsTypesGroups = container.resolve(ListService);
    const financialMovimentsTypesGroups =
      await listFinancialMovimentsTypesGroups.execute();

    return response.json(classToClass(financialMovimentsTypesGroups));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { financialMovimentTypeGroup } = request.body;
    const createFinancialMovimentTypeGroup = container.resolve(CreateService);
    const financialMovimentTypeGroupCreate =
      await createFinancialMovimentTypeGroup.execute(
        financialMovimentTypeGroup,
      );

    return response.json(classToClass(financialMovimentTypeGroupCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getFinancialMovimentTypeGroup = container.resolve(GetService);
    const financialMovimentTypeGroup =
      await getFinancialMovimentTypeGroup.execute(Number(id));

    return response.json(classToClass(financialMovimentTypeGroup));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { financialMovimentTypeGroup } = request.body;
    const updateFinancialMovimentTypeGroup = container.resolve(UpdateService);
    const financialMovimentUpdate =
      await updateFinancialMovimentTypeGroup.execute({
        id,
        ...financialMovimentTypeGroup,
      });

    return response.json(classToClass(financialMovimentUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteFinancialMovimentTypeGroup = container.resolve(DeleteService);
    await deleteFinancialMovimentTypeGroup.execute({
      id: Number(id),
    });

    return response
      .status(204)
      .json({ message: 'financialMovimentTypeGroup removed' });
  }
}
