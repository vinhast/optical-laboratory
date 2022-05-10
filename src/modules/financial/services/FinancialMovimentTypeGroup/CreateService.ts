import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesGroupsRepository from '@modules/financial/repositories/IFinancialMovimentsTypesGroupsRepository';
import FinancialMovimentTypeGroup from '@modules/financial/infra/typeorm/entities/FinancialMovimentTypeGroup';
import ICreateFinancialMovimentTypeGroupDTO from '@modules/financial/dtos/ICreateFinancialMovimentTypeGroupDTO';

@injectable()
class CreateService {
  constructor(
    @inject('FinancialMovimentsTypesGroupsRepository')
    private financialMovimentsTypesGroupsRepository: IFinancialMovimentsTypesGroupsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    request: ICreateFinancialMovimentTypeGroupDTO,
  ): Promise<FinancialMovimentTypeGroup> {
    const financialMovimentTypeGroup =
      await this.financialMovimentsTypesGroupsRepository.create(request);

    await this.cacheProvider.invalidate(
      'financial-moviments-types-groups-list',
    );

    return financialMovimentTypeGroup;
  }
}

export default CreateService;
