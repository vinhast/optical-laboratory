import { inject, injectable } from 'tsyringe';

import PaymentModule from '@modules/financial/infra/typeorm/entities/PaymentModule';
import IPaymentModulesRepository from '@modules/financial/repositories/IPaymentModulesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  type: 'Boleto';
  module: string;
  name: string;
  fields: any;
}

@injectable()
class CreateService {
  constructor(
    @inject('PaymentModulesRepository')
    private paymentModulesRepository: IPaymentModulesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    module,
    type,
    fields,
    name,
  }: IRequest): Promise<PaymentModule> {
    const paymentModule = await this.paymentModulesRepository.create({
      fields,
      module,
      type,
      name,
    });

    await this.cacheProvider.invalidate('payment-modules-list');

    return paymentModule;
  }
}

export default CreateService;
