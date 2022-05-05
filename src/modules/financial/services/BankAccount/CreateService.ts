import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';
import BankAccount from '@modules/financial/infra/typeorm/entities/BankAccount';
import ICreateBankAccountDTO from '@modules/financial/dtos/ICreateBankAccountDTO';

@injectable()
class CreateService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(request: ICreateBankAccountDTO): Promise<BankAccount> {
    const bankAccount = await this.bankAccountsRepository.create(request);

    await this.cacheProvider.invalidate('bankAccounts-list');

    return bankAccount;
  }
}

export default CreateService;
