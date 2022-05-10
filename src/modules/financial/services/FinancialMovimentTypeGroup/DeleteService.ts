import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsTypesGroupsRepository from '@modules/financial/repositories/IFinancialMovimentsTypesGroupsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('FinancialMovimentsTypesGroupsRepository')
    private financialMovimentsTypesGroupsRepository: IFinancialMovimentsTypesGroupsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const financialMovimentTypeGroup =
      await this.financialMovimentsTypesGroupsRepository.findById(id);

    if (!financialMovimentTypeGroup) {
      throw new AppError('financialMovimentTypeGroup not found.', 404);
    }

    await this.cacheProvider.invalidate(
      `financial-moviments-types-groups-list`,
    );
    await this.cacheProvider.invalidate(
      `financial-moviment-type-group-get-${id}`,
    );

    await this.financialMovimentsTypesGroupsRepository.delete(id);

    return true;
  }
}

export default DeleteService;
