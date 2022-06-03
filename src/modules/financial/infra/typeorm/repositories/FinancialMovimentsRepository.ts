import { getRepository, Repository } from 'typeorm';

import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import ICreateFinancialMovimentDTO from '@modules/financial/dtos/ICreateFinancialMovimentDTO';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';

class FinancialMovimentsRepository
  extends MainRepository
  implements IFinancialMovimentsRepository
{
  private ormRepository: Repository<FinancialMoviment>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(FinancialMoviment);
    super(repository);
    this.ormRepository = repository;
    this.userData = httpContext.get('user');
  }

  public async create(
    financialMovimentData: ICreateFinancialMovimentDTO,
  ): Promise<FinancialMoviment> {
    const financialMoviment = this.ormRepository.create(financialMovimentData);
    await this.ormRepository.save(financialMoviment);
    return financialMoviment;
  }

  public async findById(id: number): Promise<FinancialMoviment | undefined> {
    const financialMoviment = await this.ormRepository
      .createQueryBuilder('financialMoviment')
      .where(
        `financialMoviment.id = "${id}" AND financialMoviment.client_application_id = ${this.userData.client_application_id}`,
      )
      .leftJoinAndSelect(`financialMoviment.client`, `client`)
      .leftJoinAndSelect(`financialMoviment.provider`, `provider`)
      .leftJoinAndSelect(
        `financialMoviment.financialCategory`,
        `financialCategory`,
      )
      .leftJoinAndSelect(
        `financialMoviment.financialSubCategory`,
        `financialSubCategory`,
      )
      .leftJoinAndSelect(`financialMoviment.downloadedUser`, `downloadedUser`)
      .leftJoinAndSelect(`financialMoviment.generatedUser`, `generatedUser`)
      .leftJoinAndSelect(
        `financialMoviment.financialMovimentsPayments`,
        `financialMovimentsPayments`,
      )
      .leftJoinAndSelect(`financialMoviment.paymentGateway`, `paymentGateway`)
      .orderBy(`financialMovimentsPayments.created_at`, `DESC`)
      .getOne();
    return financialMoviment;
  }

  public save(
    financialMoviment: FinancialMoviment,
  ): Promise<FinancialMoviment> {
    const financialMovimentData = { ...financialMoviment };
    delete financialMovimentData.client;
    delete financialMovimentData.provider;
    delete financialMovimentData.financialCategory;
    delete financialMovimentData.financialSubCategory;
    delete financialMovimentData.generatedUser;
    delete financialMovimentData.paymentGateway;
    return this.ormRepository.save(financialMovimentData);
  }
}

export default FinancialMovimentsRepository;
