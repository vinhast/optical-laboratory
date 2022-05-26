import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';

@injectable()
class GetService {
  constructor(
    @inject('FinancialMovimentsRepository')
    private financialMovimentsRepository: IFinancialMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<FinancialMoviment> {
    const cacheKey = `financial-moviment-get-${id}`;
    let financialMoviment = await this.cacheProvider.recover<
      FinancialMoviment | undefined
    >(cacheKey);

    if (!financialMoviment) {
      financialMoviment = await this.financialMovimentsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(financialMoviment));
    }

    if (!financialMoviment) {
      throw new AppError('financialMoviment not found.', 404);
    }

    return financialMoviment;
  }
}

export default GetService;
