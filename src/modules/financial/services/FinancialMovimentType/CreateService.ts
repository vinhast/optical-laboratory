import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesRepository from '@modules/financial/repositories/IFinancialMovimentsTypesRepository';
import FinancialMovimentType from '@modules/financial/infra/typeorm/entities/FinancialMovimentType';
import ICreateFinancialMovimentTypeDTO from '@modules/financial/dtos/ICreateFinancialMovimentTypeDTO';

@injectable()
class CreateService {
  constructor(
    @inject('FinancialMovimentsTypesRepository')
    private financialMovimentsTypesRepository: IFinancialMovimentsTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    request: ICreateFinancialMovimentTypeDTO,
  ): Promise<FinancialMovimentType> {
    const financialMovimentType =
      await this.financialMovimentsTypesRepository.create(request);

    await this.cacheProvider.invalidate('financial-moviments-types-list');

    return financialMovimentType;
  }
}

export default CreateService;
