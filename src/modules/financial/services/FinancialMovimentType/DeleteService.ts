import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesRepository from '@modules/financial/repositories/IFinancialMovimentsTypesRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('FinancialMovimentsTypesRepository')
    private financialMovimentsTypesRepository: IFinancialMovimentsTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const financialMovimentType =
      await this.financialMovimentsTypesRepository.findById(id);

    if (!financialMovimentType) {
      throw new AppError('financialMoviment not found.', 404);
    }

    await this.cacheProvider.invalidate(`financial-moviments-types-list`);
    await this.cacheProvider.invalidate(`financial-moviment-type-get-${id}`);

    await this.financialMovimentsTypesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
