import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';
import BankAccount from '@modules/financial/infra/typeorm/entities/BankAccount';

@injectable()
class GetService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<BankAccount> {
    const cacheKey = `bankAccount-get-${id}`;
    let bankAccount = await this.cacheProvider.recover<BankAccount | undefined>(
      cacheKey,
    );

    if (!bankAccount) {
      bankAccount = await this.bankAccountsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(bankAccount));
    }

    if (!bankAccount) {
      throw new AppError('bankAccount not found.', 404);
    }

    return bankAccount;
  }
}

export default GetService;
