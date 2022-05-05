import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';
import BankAccount from '@modules/financial/infra/typeorm/entities/BankAccount';

@injectable()
class UpdateService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(bankAccountUpdate: BankAccount): Promise<BankAccount> {
    const id = bankAccountUpdate.id;
    const cacheKey = `bankAccount-get-${id}`;
    let bankAccount = await this.cacheProvider.recover<BankAccount | undefined>(
      cacheKey,
    );

    if (!bankAccount) {
      bankAccount = await this.bankAccountsRepository.findById(id);
    }

    if (!bankAccount) {
      throw new AppError('BankAccount not found.', 404);
    }

    bankAccount = {
      ...bankAccount,
      ...bankAccountUpdate,
    };

    await this.cacheProvider.invalidate(`bankAccounts-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.bankAccountsRepository.save(bankAccount);

    return bankAccount;
  }
}

export default UpdateService;
