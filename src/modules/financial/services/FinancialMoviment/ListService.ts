import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';

@injectable()
class ListService {
  constructor(
    @inject('FinancialMovimentsRepository')
    private financialMovimentsRepository: IFinancialMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<FinancialMoviment[]> {
    const cacheKey = `financial-moviments-list`;
    let financialMoviments = await this.cacheProvider.recover<
      FinancialMoviment[]
    >(cacheKey);

    if (!financialMoviments) {
      financialMoviments = await this.financialMovimentsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(financialMoviments));
    }

    return financialMoviments;
  }
}

export default ListService;
