import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesGroupsRepository from '@modules/financial/repositories/IFinancialMovimentsTypesGroupsRepository';
import FinancialMovimentTypeGroup from '@modules/financial/infra/typeorm/entities/FinancialMovimentTypeGroup';

@injectable()
class GetService {
  constructor(
    @inject('FinancialMovimentsTypesGroupsRepository')
    private financialMovimentTypeGroupsTypesGroupsRepository: IFinancialMovimentsTypesGroupsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<FinancialMovimentTypeGroup> {
    const cacheKey = `financial-moviment-type-group-get-${id}`;
    let financialMovimentTypeGroup = await this.cacheProvider.recover<
      FinancialMovimentTypeGroup | undefined
    >(cacheKey);

    if (!financialMovimentTypeGroup) {
      financialMovimentTypeGroup =
        await this.financialMovimentTypeGroupsTypesGroupsRepository.findById(
          id,
        );
      this.cacheProvider.save(
        cacheKey,
        classToClass(financialMovimentTypeGroup),
      );
    }

    if (!financialMovimentTypeGroup) {
      throw new AppError('financialMovimentTypeGroup not found.', 404);
    }

    return financialMovimentTypeGroup;
  }
}

export default GetService;
