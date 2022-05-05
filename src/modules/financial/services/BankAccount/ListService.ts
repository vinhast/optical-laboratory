import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';
import BankAccount from '@modules/financial/infra/typeorm/entities/BankAccount';

@injectable()
class ListService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<BankAccount[]> {
    const cacheKey = `bankAccounts-list`;
    let bankAccounts = await this.cacheProvider.recover<BankAccount[]>(
      cacheKey,
    );

    if (!bankAccounts) {
      bankAccounts = await this.bankAccountsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(bankAccounts));
    }

    return bankAccounts;
  }
}

export default ListService;
