import { container } from 'tsyringe';

import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';
import BankAccountsRepository from '@modules/financial/infra/typeorm/repositories/BankAccountsRepository';

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);
