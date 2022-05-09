import { getRepository, Repository } from 'typeorm';

import Credit from '@modules/financial/infra/typeorm/entities/Credit';
import ICreateCreditDTO from '@modules/financial/dtos/ICreateCreditDTO';
import ICreditsRepository from '@modules/financial/repositories/ICreditsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class CreditsRepository extends MainRepository implements ICreditsRepository {
  private ormRepository: Repository<Credit>;

  constructor() {
    const repository = getRepository(Credit);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(creditData: ICreateCreditDTO): Promise<Credit> {
    const credit = this.ormRepository.create(creditData);
    await this.ormRepository.save(credit);
    return credit;
  }

  public save(credit: Credit): Promise<Credit> {
    return this.ormRepository.save(credit);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CreditsRepository;
