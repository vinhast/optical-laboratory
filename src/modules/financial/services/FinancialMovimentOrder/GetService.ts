import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsOrdersRepository from '@modules/financial/repositories/IFinancialMovimentsOrdersRepository';
import FinancialMovimentOrder from '@modules/financial/infra/typeorm/entities/FinancialMovimentOrder';

@injectable()
class GetService {
  constructor(
    @inject('FinancialMovimentsOrdersRepository')
    private financialMovimentOrdersOrdersRepository: IFinancialMovimentsOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<FinancialMovimentOrder> {
    const cacheKey = `financial-moviment-order-get-${id}`;
    let financialMovimentOrder = await this.cacheProvider.recover<
      FinancialMovimentOrder | undefined
    >(cacheKey);

    if (!financialMovimentOrder) {
      financialMovimentOrder =
        await this.financialMovimentOrdersOrdersRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(financialMovimentOrder));
    }

    if (!financialMovimentOrder) {
      throw new AppError('financialMovimentOrder not found.', 404);
    }

    return financialMovimentOrder;
  }
}

export default GetService;
