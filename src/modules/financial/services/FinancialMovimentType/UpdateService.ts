import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesRepository from '@modules/financial/repositories/IFinancialMovimentsTypesRepository';
import FinancialMovimentType from '@modules/financial/infra/typeorm/entities/FinancialMovimentType';

@injectable()
class UpdateService {
  constructor(
    @inject('FinancialMovimentsTypesRepository')
    private financialMovimentsTypesRepository: IFinancialMovimentsTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    financialMovimentTypeUpdate: FinancialMovimentType,
  ): Promise<FinancialMovimentType> {
    const id = financialMovimentTypeUpdate.id;
    const cacheKey = `financial-moviment-type-get-${id}`;
    let financialMovimentType = await this.cacheProvider.recover<
      FinancialMovimentType | undefined
    >(cacheKey);

    if (!financialMovimentType) {
      financialMovimentType =
        await this.financialMovimentsTypesRepository.findById(id);
    }

    if (!financialMovimentType) {
      throw new AppError('FinancialMovimentType not found.', 404);
    }

    financialMovimentType = {
      ...financialMovimentType,
      ...financialMovimentTypeUpdate,
    };

    await this.cacheProvider.invalidate(`financial-moviments-types-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.financialMovimentsTypesRepository.save(financialMovimentType);

    return financialMovimentType;
  }
}

export default UpdateService;
