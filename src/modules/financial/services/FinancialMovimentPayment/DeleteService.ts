import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('FinancialMovimentPaymentsRepository')
    private financialMovimentPaymentsRepository: IFinancialMovimentsPaymentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const financialMovimentsPayments =
      await this.financialMovimentPaymentsRepository.findById(id);

    if (!financialMovimentsPayments) {
      throw new AppError('Financial moviment payment not found.', 404);
    }

    await this.cacheProvider.invalidate(`financial-moviments-list`);
    await this.cacheProvider.invalidate(`financial-moviment-get-${id}`);

    await this.financialMovimentPaymentsRepository.delete(id);

    return true;
  }
}

export default DeleteService;
