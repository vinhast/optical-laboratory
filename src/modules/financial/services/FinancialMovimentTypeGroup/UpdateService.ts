import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesGroupsRepository from '@modules/financial/repositories/IFinancialMovimentsTypesGroupsRepository';
import FinancialMovimentTypeGroup from '@modules/financial/infra/typeorm/entities/FinancialMovimentTypeGroup';
import ICreateFinancialMovimentTypeGroupDTO from '@modules/financial/dtos/ICreateFinancialMovimentTypeGroupDTO';

interface IRequest extends ICreateFinancialMovimentTypeGroupDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('FinancialMovimentsTypesGroupsRepository')
    private financialMovimentsTypesGroupsRepository: IFinancialMovimentsTypesGroupsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    financialMovimentTypeGroupUpdate: IRequest,
  ): Promise<FinancialMovimentTypeGroup> {
    const id = financialMovimentTypeGroupUpdate.id;
    const cacheKey = `financial-moviment-type-group-get-${id}`;
    let financialMovimentTypeGroup = await this.cacheProvider.recover<
      FinancialMovimentTypeGroup | undefined
    >(cacheKey);

    if (!financialMovimentTypeGroup) {
      financialMovimentTypeGroup =
        await this.financialMovimentsTypesGroupsRepository.findById(id);
    }

    if (!financialMovimentTypeGroup) {
      throw new AppError('FinancialMovimentTypeGroup not found.', 404);
    }

    financialMovimentTypeGroup = {
      ...financialMovimentTypeGroup,
      ...financialMovimentTypeGroupUpdate,
    };

    await this.cacheProvider.invalidate(
      `financial-moviments-types-groups-list`,
    );
    await this.cacheProvider.invalidate(cacheKey);

    await this.financialMovimentsTypesGroupsRepository.save(
      financialMovimentTypeGroup,
    );

    return financialMovimentTypeGroup;
  }
}

export default UpdateService;
