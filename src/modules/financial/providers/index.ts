import { container } from 'tsyringe';

import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';
import BankAccountsRepository from '@modules/financial/infra/typeorm/repositories/BankAccountsRepository';

import ICreditsRepository from '@modules/financial/repositories/ICreditsRepository';
import CreditsRepository from '@modules/financial/infra/typeorm/repositories/CreditsRepository';

import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import FinancialMovimentsRepository from '@modules/financial/infra/typeorm/repositories/FinancialMovimentsRepository';

import IFinancialMovimentsOrdersRepository from '@modules/financial/repositories/IFinancialMovimentsOrdersRepository';
import FinancialMovimentsOrdersRepository from '@modules/financial/infra/typeorm/repositories/FinancialMovimentsOrdersRepository';

import IFinancialMovimentsTypesRepository from '@modules/financial/repositories/IFinancialMovimentsTypesRepository';
import FinancialMovimentsTypesRepository from '@modules/financial/infra/typeorm/repositories/FinancialMovimentsTypesRepository';

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);

container.registerSingleton<ICreditsRepository>(
  'CreditsRepository',
  CreditsRepository,
);

container.registerSingleton<IFinancialMovimentsRepository>(
  'FinancialMovimentsRepository',
  FinancialMovimentsRepository,
);

container.registerSingleton<IFinancialMovimentsOrdersRepository>(
  'FinancialMovimentsOrdersRepository',
  FinancialMovimentsOrdersRepository,
);

container.registerSingleton<IFinancialMovimentsTypesRepository>(
  'FinancialMovimentsTypesRepository',
  FinancialMovimentsTypesRepository,
);
