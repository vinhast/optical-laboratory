import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const paymentGateway = await this.paymentGatewaysRepository.findById(id);

    if (!paymentGateway) {
      throw new AppError('Payment Gateway not found.', 404);
    }

    await this.cacheProvider.invalidate(`payment-gateways-list`);
    await this.cacheProvider.invalidate(`payment-gateway-get-${id}`);

    await this.paymentGatewaysRepository.delete(id);

    return true;
  }
}

export default DeleteService;
