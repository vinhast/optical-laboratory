import { getRepository, Repository } from 'typeorm';

import FinancialMovimentPayment from '@modules/financial/infra/typeorm/entities/FinancialMovimentPayment';
import ICreateFinancialMovimentPaymentDTO from '@modules/financial/dtos/ICreateFinancialMovimentPaymentDTO';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import httpContext from 'express-http-context';

interface IFindByDocumentNumber {
  document_number: string;
  client_application_id: number;
}

interface IFindById {
  id: number;
  client_application_id: number;
}

class FinancialMovimentPaymentsRepository
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
  ): Promise<FinancialMovimentPayment | undefined> {
    this.userData = httpContext.get('user');
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
  public async findByDocumentNumber({
    client_application_id,
    document_number,
  }: IFindByDocumentNumber): Promise<FinancialMovimentPayment | undefined> {
    const financialMovimentPayment = await this.ormRepository.findOne({
      where: {
        document_number,
        client_application_id,
      },
    });
    return financialMovimentPayment;
  }

  public async findById({
    client_application_id,
    id,
  }: IFindById): Promise<FinancialMovimentPayment | undefined> {
    const financialMovimentPayment = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id,
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
