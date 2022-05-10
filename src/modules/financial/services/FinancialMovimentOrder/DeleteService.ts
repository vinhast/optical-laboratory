import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsOrdersRepository from '@modules/financial/repositories/IFinancialMovimentsOrdersRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('FinancialMovimentsOrdersRepository')
    private financialMovimentsOrdersRepository: IFinancialMovimentsOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const financialMovimentOrder =
      await this.financialMovimentsOrdersRepository.findById(id);

    if (!financialMovimentOrder) {
      throw new AppError('financialMoviment not found.', 404);
    }

    await this.cacheProvider.invalidate(`financial-moviments-orders-list`);
    await this.cacheProvider.invalidate(`financial-moviment-order-get-${id}`);

    await this.financialMovimentsOrdersRepository.delete(id);

    return true;
  }
}

export default DeleteService;
