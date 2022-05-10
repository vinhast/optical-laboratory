import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesRepository from '@modules/financial/repositories/IFinancialMovimentsTypesRepository';
import FinancialMovimentType from '@modules/financial/infra/typeorm/entities/FinancialMovimentType';

@injectable()
class ListService {
  constructor(
    @inject('FinancialMovimentsTypesRepository')
    private financialMovimentsTypesRepository: IFinancialMovimentsTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<FinancialMovimentType[]> {
    const cacheKey = `financial-moviments-types-list`;
    let financialMovimentsTypes = await this.cacheProvider.recover<
      FinancialMovimentType[]
    >(cacheKey);

    if (!financialMovimentsTypes) {
      financialMovimentsTypes =
        await this.financialMovimentsTypesRepository.findAll();
      await this.cacheProvider.save(
        cacheKey,
        classToClass(financialMovimentsTypes),
      );
    }

    return financialMovimentsTypes;
  }
}

export default ListService;
