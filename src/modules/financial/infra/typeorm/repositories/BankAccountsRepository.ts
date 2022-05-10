import { getRepository, Repository } from 'typeorm';

import BankAccount from '@modules/financial/infra/typeorm/entities/BankAccount';
import ICreateBankAccountDTO from '@modules/financial/dtos/ICreateBankAccountDTO';
import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class BankAccountsRepository
  extends MainRepository
  implements IBankAccountsRepository
{
  private ormRepository: Repository<BankAccount>;

  constructor() {
    const repository = getRepository(BankAccount);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    bankAccountData: ICreateBankAccountDTO,
  ): Promise<BankAccount> {
    const bankAccount = this.ormRepository.create(bankAccountData);
    await this.ormRepository.save(bankAccount);
    return bankAccount;
  }

  public save(bankAccount: BankAccount): Promise<BankAccount> {
    return this.ormRepository.save(bankAccount);
  }
}

export default BankAccountsRepository;
