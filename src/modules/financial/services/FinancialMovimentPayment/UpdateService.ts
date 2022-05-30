import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import FinancialMovimentPayment from '@modules/financial/infra/typeorm/entities/FinancialMovimentPayment';
import ICreateFinancialMovimentPaymentDTO from '@modules/financial/dtos/ICreateFinancialMovimentPaymentDTO';

interface IRequest extends ICreateFinancialMovimentPaymentDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('FinancialMovimentPaymentsRepository')
    private financialMovimentPaymentsRepository: IFinancialMovimentsPaymentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    financialMovimentPaymentUpdate: IRequest,
  ): Promise<FinancialMovimentPayment> {
    const id = financialMovimentPaymentUpdate.id;
    const cacheKey = `financial-moviment-get-${id}`;
    let financialMovimentPayment = await this.cacheProvider.recover<
      FinancialMovimentPayment | undefined
    >(cacheKey);

    if (!financialMovimentPayment) {
      financialMovimentPayment =
        await this.financialMovimentPaymentsRepository.findById(id);
    }

    if (!financialMovimentPayment) {
      throw new AppError('FinancialMovimentPayment not found.', 404);
    }

    financialMovimentPayment = {
      ...financialMovimentPayment,
      ...financialMovimentPaymentUpdate,
    };

    await this.cacheProvider.invalidate(`financial-moviments-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.financialMovimentPaymentsRepository.save(
      financialMovimentPayment,
    );

    return financialMovimentPayment;
  }
}

export default UpdateService;
