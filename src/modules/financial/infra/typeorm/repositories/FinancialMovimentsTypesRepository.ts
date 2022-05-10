import { getRepository, Repository } from 'typeorm';

import FinancialMovimentType from '@modules/financial/infra/typeorm/entities/FinancialMovimentType';
import ICreateFinancialMovimentTypeDTO from '@modules/financial/dtos/ICreateFinancialMovimentTypeDTO';
import IFinancialMovimentsTypesRepository from '@modules/financial/repositories/IFinancialMovimentsTypesRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class FinancialMovimentsTypesRepository
  extends MainRepository
  implements IFinancialMovimentsTypesRepository
{
  private ormRepository: Repository<FinancialMovimentType>;

  constructor() {
    const repository = getRepository(FinancialMovimentType);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    financialMovimentTypeData: ICreateFinancialMovimentTypeDTO,
  ): Promise<FinancialMovimentType> {
    const financialMovimentType = this.ormRepository.create(
      financialMovimentTypeData,
    );
    await this.ormRepository.save(financialMovimentType);
    return financialMovimentType;
  }

  public save(
    financialMovimentType: FinancialMovimentType,
  ): Promise<FinancialMovimentType> {
    return this.ormRepository.save(financialMovimentType);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FinancialMovimentsTypesRepository;
