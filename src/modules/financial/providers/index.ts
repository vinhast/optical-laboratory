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

import IFinancialMovimentsTypesGroupsRepository from '@modules/financial/repositories/IFinancialMovimentsTypesGroupsRepository';
import FinancialMovimentsTypesGroupsRepository from '@modules/financial/infra/typeorm/repositories/FinancialMovimentsTypesGroupsRepository';

import IFiscalSettingsRepository from '@modules/financial/repositories/IFiscalSettingsRepository';
import FiscalSettingsRepository from '@modules/financial/infra/typeorm/repositories/FiscalSettingsRepository';

import IFinancialCategoriesRepository from '@modules/financial/repositories/IFinancialCategoriesRepository';
import FinancialCategoriesRepository from '@modules/financial/infra/typeorm/repositories/FinancialCategoriesRepository';

import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import PaymentGatewaysRepository from '@modules/financial/infra/typeorm/repositories/PaymentGatewaysRepository';

import IPaymentModulesRepository from '@modules/financial/repositories/IPaymentModulesRepository';
import PaymentModulesRepository from '@modules/financial/infra/typeorm/repositories/PaymentModulesRepository';

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

container.registerSingleton<IFinancialMovimentsTypesGroupsRepository>(
  'FinancialMovimentsTypesGroupsRepository',
  FinancialMovimentsTypesGroupsRepository,
);

container.registerSingleton<IFiscalSettingsRepository>(
  'FiscalSettingsRepository',
  FiscalSettingsRepository,
);

container.registerSingleton<IFinancialCategoriesRepository>(
  'FinancialCategoriesRepository',
  FinancialCategoriesRepository,
);

container.registerSingleton<IPaymentGatewaysRepository>(
  'PaymentGatewaysRepository',
  PaymentGatewaysRepository,
);

container.registerSingleton<IPaymentModulesRepository>(
  'PaymentModulesRepository',
  PaymentModulesRepository,
);
