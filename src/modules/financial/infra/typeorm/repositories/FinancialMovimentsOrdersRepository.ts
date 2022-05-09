import { getRepository, Repository } from 'typeorm';

import FinancialMovimentOrder from '@modules/financial/infra/typeorm/entities/FinancialMovimentOrder';
import ICreateFinancialMovimentOrderDTO from '@modules/financial/dtos/ICreateFinancialMovimentOrderDTO';
import IFinancialMovimentOrdersRepository from '@modules/financial/repositories/IFinancialMovimentsOrdersRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class FinancialMovimentsOrdersRepository
  extends MainRepository
  implements IFinancialMovimentOrdersRepository
{
  private ormRepository: Repository<FinancialMovimentOrder>;

  constructor() {
    const repository = getRepository(FinancialMovimentOrder);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    financialMovimentOrderData: ICreateFinancialMovimentOrderDTO,
  ): Promise<FinancialMovimentOrder> {
    const financialMovimentOrder = this.ormRepository.create(
      financialMovimentOrderData,
    );
    await this.ormRepository.save(financialMovimentOrder);
    return financialMovimentOrder;
  }

  public save(
    financialMovimentOrder: FinancialMovimentOrder,
  ): Promise<FinancialMovimentOrder> {
    return this.ormRepository.save(financialMovimentOrder);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FinancialMovimentsOrdersRepository;
