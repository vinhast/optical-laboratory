import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import IBankApiProvider from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';

interface IRequest {
  ourNumber: string;
  cancellationReason:
    | 'ACERTOS'
    | 'APEDIDODOCLIENTE'
    | 'DEVOLUCAO'
    | 'PAGODIRETOAOCLIENTE'
    | 'SUBSTITUICAO';
  payment_gateway_id: number;
}

@injectable()
class CancelBankSlipService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('BankApiProvider')
    private bankApiProvider: IBankApiProvider,
  ) {}

  public async execute({
    cancellationReason,
    ourNumber,
    payment_gateway_id,
  }: IRequest): Promise<boolean> {
    const id = payment_gateway_id;
    const cacheKey = `payment-gateway-get-${id}`;
    let paymentGateway;

    if (!paymentGateway) {
      paymentGateway = await this.paymentGatewaysRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(paymentGateway));
    }

    if (!paymentGateway) {
      throw new AppError('Payment Gateway not found.', 404);
    }

    const bankModule = await this.bankApiProvider.getBankModule(
      paymentGateway.payment_module_id,
    );
    if (bankModule) {
      const cancelBankSlip = await bankModule.cancelBankSlip({
        cancellationReason,
        credentials: paymentGateway.credentials,
        ourNumber,
      });
      return cancelBankSlip;
    }

    return false;
  }
}

export default CancelBankSlipService;
