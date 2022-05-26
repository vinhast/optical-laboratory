/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IInterApiProvider from '@shared/contanier/providers/InterApiProvider/models/IInterApiProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  type: 'Boleto';
  credentials: any;
  payment_module_id: number;
}

@injectable()
class CreateService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('InterApiProvider')
    private interApiProvider: IInterApiProvider,
  ) {}

  public async execute({
    type,
    credentials,
    payment_module_id,
  }: IRequest): Promise<PaymentGateway> {
    const token = await this.interApiProvider.getToken(credentials);
    if (!token) {
      throw new AppError('Credetials is not valid', 401);
    }
    const paymentGateway = await this.paymentGatewaysRepository.create({
      credentials,
      type,
      payment_module_id,
    });

    await this.cacheProvider.invalidate('payment-gateways-list');

    return paymentGateway;
  }
}

export default CreateService;
