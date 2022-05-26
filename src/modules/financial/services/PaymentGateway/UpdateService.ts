/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import IInterApiProvider from '@shared/contanier/providers/InterApiProvider/models/IInterApiProvider';

interface IRequest {
  id: number;
  type: 'Boleto';
  credentials: any;
  payment_module_id: number;
  files?: any;
}

@injectable()
class UpdateService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('InterApiProvider')
    private interApiProvider: IInterApiProvider,
  ) {}

  public async execute(
    paymentGatewayUpdate: IRequest,
  ): Promise<PaymentGateway> {
    const id = paymentGatewayUpdate.id;
    const cacheKey = `payment-gateway-get-${id}`;
    let paymentGateway = await this.cacheProvider.recover<
      PaymentGateway | undefined
    >(cacheKey);

    if (!paymentGateway) {
      paymentGateway = await this.paymentGatewaysRepository.findById(id);
    }

    if (!paymentGateway) {
      throw new AppError('Payment Gateway not found.', 404);
    }

    const token = await this.interApiProvider.getToken({
      ...paymentGatewayUpdate.credentials,
      ...paymentGateway.credentials,
    });
    if (!token) {
      throw new AppError('Credetials is not valid', 401);
    }

    paymentGateway = {
      ...paymentGateway,
      ...paymentGatewayUpdate,
    };

    await this.cacheProvider.invalidate(`payment-gateways-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.paymentGatewaysRepository.save(paymentGateway);

    return paymentGateway;
  }
}

export default UpdateService;
