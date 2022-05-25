import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@modules/financial/services/PaymentModule/CreateService';
import GetService from '@modules/financial/services/PaymentModule/GetService';
import UpdateService from '@modules/financial/services/PaymentModule/UpdateService';
import DeleteService from '@modules/financial/services/PaymentModule/DeleteService';
import ListService from '@modules/financial/services/PaymentModule/ListService';

export default class PaymentModulesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listPaymentModules = container.resolve(ListService);
    const paymentModules = await listPaymentModules.execute();

    return response.json(classToClass(paymentModules));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { module, type, fields, name } = request.body;
    const createPaymentModule = container.resolve(CreateService);
    const paymentModule = await createPaymentModule.execute({
      module,
      type,
      fields,
      name,
    });

    return response.json(classToClass(paymentModule));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getPaymentModule = container.resolve(GetService);
    const paymentModule = await getPaymentModule.execute(Number(id));

    return response.json(classToClass(paymentModule));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { module, type, fields, name } = request.body;
    const updatePaymentModule = container.resolve(UpdateService);
    const paymentModule = await updatePaymentModule.execute({
      id: Number(id),
      module,
      type,
      fields,
      name,
    });

    return response.json(classToClass(paymentModule));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletePaymentModule = container.resolve(DeleteService);
    await deletePaymentModule.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Payment Module removed' });
  }
}
