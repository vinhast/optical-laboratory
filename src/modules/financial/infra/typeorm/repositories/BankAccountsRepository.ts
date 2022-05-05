import { getRepository, Repository } from 'typeorm';

import BankAccount from '@modules/financial/infra/typeorm/entities/BankAccount';
import ICreateBankAccountDTO from '@modules/financial/dtos/ICreateBankAccountDTO';
import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';

class BankAccountsRepository implements IBankAccountsRepository {
  private ormRepository: Repository<BankAccount>;

  constructor() {
    this.ormRepository = getRepository(BankAccount);
  }
  public async findById(id: number): Promise<BankAccount | undefined> {
    const bankAccount = await this.ormRepository.findOne(id);
    return bankAccount;
  }

  public async findAll(): Promise<BankAccount[]> {
    const BankAccounts = await this.ormRepository.find();
    return BankAccounts;
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

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default BankAccountsRepository;
