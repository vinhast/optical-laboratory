import { container } from 'tsyringe';

import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';
import BankAccountsRepository from '@modules/financial/infra/typeorm/repositories/BankAccountsRepository';

import ICreditsRepository from '@modules/financial/repositories/ICreditsRepository';
import CreditsRepository from '@modules/financial/infra/typeorm/repositories/CreditsRepository';

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);

container.registerSingleton<ICreditsRepository>(
  'CreditsRepository',
  CreditsRepository,
);
