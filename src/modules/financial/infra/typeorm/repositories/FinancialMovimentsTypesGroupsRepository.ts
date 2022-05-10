import { getRepository, Repository } from 'typeorm';

import FinancialMovimentTypeGroup from '@modules/financial/infra/typeorm/entities/FinancialMovimentTypeGroup';
import ICreateFinancialMovimentTypeGroupDTO from '@modules/financial/dtos/ICreateFinancialMovimentTypeGroupDTO';
import IFinancialMovimentsTypesGroupsRepository from '@modules/financial/repositories/IFinancialMovimentsTypesGroupsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class FinancialMovimentsTypesRepository
  extends MainRepository
  implements IFinancialMovimentsTypesGroupsRepository
{
  private ormRepository: Repository<FinancialMovimentTypeGroup>;

  constructor() {
    const repository = getRepository(FinancialMovimentTypeGroup);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    financialMovimentTypeGroupData: ICreateFinancialMovimentTypeGroupDTO,
  ): Promise<FinancialMovimentTypeGroup> {
    const financialMovimentTypeGroup = this.ormRepository.create(
      financialMovimentTypeGroupData,
    );
    await this.ormRepository.save(financialMovimentTypeGroup);
    return financialMovimentTypeGroup;
  }

  public save(
    financialMovimentTypeGroup: FinancialMovimentTypeGroup,
  ): Promise<FinancialMovimentTypeGroup> {
    return this.ormRepository.save(financialMovimentTypeGroup);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FinancialMovimentsTypesRepository;
