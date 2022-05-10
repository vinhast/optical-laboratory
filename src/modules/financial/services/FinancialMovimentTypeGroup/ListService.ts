import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesGroupsRepository from '@modules/financial/repositories/IFinancialMovimentsTypesGroupsRepository';
import FinancialMovimentTypeGroup from '@modules/financial/infra/typeorm/entities/FinancialMovimentTypeGroup';

@injectable()
class ListService {
  constructor(
    @inject('FinancialMovimentsTypesGroupsRepository')
    private financialMovimentsTypesGroupsRepository: IFinancialMovimentsTypesGroupsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<FinancialMovimentTypeGroup[]> {
    const cacheKey = `financial-moviments-types-groups-list`;
    let financialMovimentsTypesGroups = await this.cacheProvider.recover<
      FinancialMovimentTypeGroup[]
    >(cacheKey);

    if (!financialMovimentsTypesGroups) {
      financialMovimentsTypesGroups =
        await this.financialMovimentsTypesGroupsRepository.findAll();
      await this.cacheProvider.save(
        cacheKey,
        classToClass(financialMovimentsTypesGroups),
      );
    }

    return financialMovimentsTypesGroups;
  }
}

export default ListService;
