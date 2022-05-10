import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsOrdersRepository from '@modules/financial/repositories/IFinancialMovimentsOrdersRepository';
import FinancialMovimentOrder from '@modules/financial/infra/typeorm/entities/FinancialMovimentOrder';

@injectable()
class ListService {
  constructor(
    @inject('FinancialMovimentsOrdersRepository')
    private financialMovimentsOrdersRepository: IFinancialMovimentsOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<FinancialMovimentOrder[]> {
    const cacheKey = `financial-moviments-orders-list`;
    let financialMovimentsOrders = await this.cacheProvider.recover<
      FinancialMovimentOrder[]
    >(cacheKey);

    if (!financialMovimentsOrders) {
      financialMovimentsOrders =
        await this.financialMovimentsOrdersRepository.findAll();
      await this.cacheProvider.save(
        cacheKey,
        classToClass(financialMovimentsOrders),
      );
    }

    return financialMovimentsOrders;
  }
}

export default ListService;
