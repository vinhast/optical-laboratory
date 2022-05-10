import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/FinancialMoviment/ListService';
import CreateService from '@modules/financial/services/FinancialMoviment/CreateService';
import UpdateService from '@modules/financial/services/FinancialMoviment/UpdateService';
import GetService from '@modules/financial/services/FinancialMoviment/GetService';
import DeleteService from '@modules/financial/services/FinancialMoviment/DeleteService';

export default class FinancialMovimentsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listFinancialMoviments = container.resolve(ListService);
    const financialMoviments = await listFinancialMoviments.execute();

    return response.json(classToClass(financialMoviments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { financialMoviment } = request.body;
    const createFinancialMoviment = container.resolve(CreateService);
    const financialMovimentCreate = await createFinancialMoviment.execute(
      financialMoviment,
    );

    return response.json(classToClass(financialMovimentCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getFinancialMoviment = container.resolve(GetService);
    const financialMoviment = await getFinancialMoviment.execute(Number(id));

    return response.json(classToClass(financialMoviment));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { financialMoviment } = request.body;
    const updateFinancialMoviment = container.resolve(UpdateService);
    const financialMovimentUpdate = await updateFinancialMoviment.execute({
      id,
      ...financialMoviment,
    });

    return response.json(classToClass(financialMovimentUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteFinancialMoviment = container.resolve(DeleteService);
    await deleteFinancialMoviment.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'financialMoviment removed' });
  }
}
