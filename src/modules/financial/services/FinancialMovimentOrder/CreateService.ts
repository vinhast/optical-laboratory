import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsOrdersRepository from '@modules/financial/repositories/IFinancialMovimentsOrdersRepository';
import FinancialMovimentOrder from '@modules/financial/infra/typeorm/entities/FinancialMovimentOrder';
import ICreateFinancialMovimentOrderDTO from '@modules/financial/dtos/ICreateFinancialMovimentOrderDTO';

@injectable()
class CreateService {
  constructor(
    @inject('FinancialMovimentsOrdersRepository')
    private financialMovimentsOrdersRepository: IFinancialMovimentsOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    request: ICreateFinancialMovimentOrderDTO,
  ): Promise<FinancialMovimentOrder> {
    const financialMovimentOrder =
      await this.financialMovimentsOrdersRepository.create(request);

    await this.cacheProvider.invalidate('financial-moviments-orders-list');

    return financialMovimentOrder;
  }
}

export default CreateService;
