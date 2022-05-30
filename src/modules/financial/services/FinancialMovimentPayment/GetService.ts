import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import FinancialMovimentPayment from '@modules/financial/infra/typeorm/entities/FinancialMovimentPayment';

@injectable()
class GetService {
  constructor(
    @inject('FinancialMovimentPaymentsRepository')
    private financialMovimentPaymentsRepository: IFinancialMovimentsPaymentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<FinancialMovimentPayment> {
    const cacheKey = `financial-moviment-get-${id}`;
    let financialMovimentPayment = await this.cacheProvider.recover<
      FinancialMovimentPayment | undefined
    >(cacheKey);

    if (!financialMovimentPayment) {
      financialMovimentPayment =
        await this.financialMovimentPaymentsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(financialMovimentPayment));
    }

    if (!financialMovimentPayment) {
      throw new AppError('FinancialMovimentPayment not found.', 404);
    }

    return financialMovimentPayment;
  }
}

export default GetService;
