/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import IBankApiProvider, {
  ICredentials,
} from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';

interface IRequest {
  id: number;
  type: 'Boleto';
  credentials: ICredentials;
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
    @inject('BankApiProvider')
    private bankApiProvider: IBankApiProvider,
  ) {}

  public async execute(
    paymentGatewayUpdate: IRequest,
  ): Promise<PaymentGateway> {
    const id = paymentGatewayUpdate.id;
    let token;
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

    const bankModule = await this.bankApiProvider.getBankModule(
      paymentGatewayUpdate.payment_module_id,
    );

    if (bankModule) {
      token = await bankModule.getToken({
        ...paymentGatewayUpdate.credentials,
        ...paymentGateway.credentials,
      });
    }

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
