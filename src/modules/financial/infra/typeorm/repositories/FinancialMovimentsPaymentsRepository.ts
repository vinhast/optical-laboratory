import { getRepository, Repository } from 'typeorm';

import FinancialMovimentPayment from '@modules/financial/infra/typeorm/entities/FinancialMovimentPayment';
import ICreateFinancialMovimentPaymentDTO from '@modules/financial/dtos/ICreateFinancialMovimentPaymentDTO';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';

class FinancialMovimentPaymentsRepository
  extends MainRepository
  implements IFinancialMovimentsPaymentsRepository
{
  private ormRepository: Repository<FinancialMovimentPayment>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(FinancialMovimentPayment);
    super(repository);
    this.ormRepository = repository;
    this.userData = httpContext.get('user');
  }

  public async create(
    FinancialMovimentPaymentData: ICreateFinancialMovimentPaymentDTO,
  ): Promise<FinancialMovimentPayment> {
    const financialMovimentPayment = this.ormRepository.create(
      FinancialMovimentPaymentData,
    );
    await this.ormRepository.save(financialMovimentPayment);
    return financialMovimentPayment;
  }

  public async findByFinancialMovimentId(
    financial_moviment_id: number,
  ): Promise<any | undefined> {
    const financialMovimentPayment = await this.ormRepository.findOne({
      where: {
        financial_moviment_id,
        client_application_id: this.userData.client_application_id,
      },
      order: {
        created_at: 'DESC',
      },
    });
    return financialMovimentPayment;
  }

  public save(
    financialMovimentPayment: FinancialMovimentPayment,
  ): Promise<FinancialMovimentPayment> {
    return this.ormRepository.save(financialMovimentPayment);
  }
}

export default FinancialMovimentPaymentsRepository;
