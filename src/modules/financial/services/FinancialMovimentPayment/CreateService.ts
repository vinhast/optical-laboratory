/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import FinancialMovimentPayment from '@modules/financial/infra/typeorm/entities/FinancialMovimentPayment';
import ICreateFinancialMovimentPaymentDTO from '@modules/financial/dtos/ICreateFinancialMovimentPaymentDTO';

@injectable()
class CreateService {
  constructor(
    @inject('FinancialMovimentPaymentsRepository')
    private financialMovimentPaymentsRepository: IFinancialMovimentsPaymentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    request: ICreateFinancialMovimentPaymentDTO,
  ): Promise<FinancialMovimentPayment> {
    const financialMovimentPayment =
      await this.financialMovimentPaymentsRepository.create(request);

    await this.cacheProvider.invalidate('financial-moviments-list');

    return financialMovimentPayment;
  }
}

export default CreateService;
