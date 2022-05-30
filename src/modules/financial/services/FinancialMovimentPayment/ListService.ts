import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import FinancialMovimentPayment from '@modules/financial/infra/typeorm/entities/FinancialMovimentPayment';

@injectable()
class ListService {
  constructor(
    @inject('FinancialMovimentPaymentsRepository')
    private financialMovimentPaymentsRepository: IFinancialMovimentsPaymentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<FinancialMovimentPayment[]> {
    const cacheKey = `financial-moviments-list`;
    let financialMovimentPayments = await this.cacheProvider.recover<
      FinancialMovimentPayment[]
    >(cacheKey);

    if (!financialMovimentPayments) {
      financialMovimentPayments =
        await this.financialMovimentPaymentsRepository.findAll();
      await this.cacheProvider.save(
        cacheKey,
        classToClass(financialMovimentPayments),
      );
    }

    return financialMovimentPayments;
  }
}

export default ListService;
