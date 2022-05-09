import { getRepository, Repository } from 'typeorm';

import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import ICreateFinancialMovimentDTO from '@modules/financial/dtos/ICreateFinancialMovimentDTO';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class FinancialMovimentsRepository
  extends MainRepository
  implements IFinancialMovimentsRepository
{
  private ormRepository: Repository<FinancialMoviment>;

  constructor() {
    const repository = getRepository(FinancialMoviment);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    financialMovimentData: ICreateFinancialMovimentDTO,
  ): Promise<FinancialMoviment> {
    const financialMoviment = this.ormRepository.create(financialMovimentData);
    await this.ormRepository.save(financialMoviment);
    return financialMoviment;
  }

  public save(
    financialMoviment: FinancialMoviment,
  ): Promise<FinancialMoviment> {
    return this.ormRepository.save(financialMoviment);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FinancialMovimentsRepository;
