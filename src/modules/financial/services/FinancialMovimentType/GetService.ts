import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesRepository from '@modules/financial/repositories/IFinancialMovimentsTypesRepository';
import FinancialMovimentType from '@modules/financial/infra/typeorm/entities/FinancialMovimentType';

@injectable()
class GetService {
  constructor(
    @inject('FinancialMovimentsTypesRepository')
    private financialMovimentTypesTypesRepository: IFinancialMovimentsTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<FinancialMovimentType> {
    const cacheKey = `financial-moviment-type-get-${id}`;
    let financialMovimentType = await this.cacheProvider.recover<
      FinancialMovimentType | undefined
    >(cacheKey);

    if (!financialMovimentType) {
      financialMovimentType =
        await this.financialMovimentTypesTypesRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(financialMovimentType));
    }

    if (!financialMovimentType) {
      throw new AppError('financialMovimentType not found.', 404);
    }

    return financialMovimentType;
  }
}

export default GetService;
