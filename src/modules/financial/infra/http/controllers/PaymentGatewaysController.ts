import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateService from '@modules/financial/services/PaymentGateway/CreateService';
import GetService from '@modules/financial/services/PaymentGateway/GetService';
import UpdateService from '@modules/financial/services/PaymentGateway/UpdateService';
import DeleteService from '@modules/financial/services/PaymentGateway/DeleteService';
import ListService from '@modules/financial/services/PaymentGateway/ListService';

export default class PaymentGatewaysController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listPaymentGateways = container.resolve(ListService);
    const paymentGateways = await listPaymentGateways.execute();

    return response.json(classToClass(paymentGateways));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { type, payment_module_id, credentials } = request.body;
    const createPaymentGateway = container.resolve(CreateService);

    const paymentGateway = await createPaymentGateway.execute({
      type,
      payment_module_id,
      credentials,
    });

    return response.json(classToClass(paymentGateway));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getPaymentGateway = container.resolve(GetService);
    const paymentGateway = await getPaymentGateway.execute(Number(id));

    return response.json(classToClass(paymentGateway));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { type, credentials, payment_module_id } = request.body;
    const updatePaymentGateway = container.resolve(UpdateService);
    const paymentGateway = await updatePaymentGateway.execute({
      id: Number(id),
      type,
      payment_module_id,
      credentials,
      files: request.files,
    });

    return response.json(classToClass(paymentGateway));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletePaymentGateway = container.resolve(DeleteService);
    await deletePaymentGateway.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Payment Gateway removed' });
  }
}
