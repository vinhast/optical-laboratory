import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';
import BCriptyHashProvider from '@modules/users/providers/HashProvider/implementations/BCriptyHashProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

import IMenusRepository from '@modules/users/repositories/IMenusRepository';
import MenusRepository from '@modules/users/infra/typeorm/repositories/MenusRepository';

import ISalesTablesRepository from '@modules/users/repositories/ISalesTablesRepository';
import SalesTablesRepository from '@modules/users/infra/typeorm/repositories/SalesTablesRepository';

import ISalesTablesPriceRepository from '@modules/users/repositories/ISalesTablesPricesRepository';
import SalesTablesPriceRepository from '@modules/users/infra/typeorm/repositories/SalesTablesPricesRepository';

import ISalesTablesPricesServicesRepository from '@modules/users/repositories/ISalesTablesPricesServicesRepository';
import SalesTablesPricesServiceRepository from '@modules/users/infra/typeorm/repositories/SalesTablesPricesServicesRepository';

import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ClientsApplicationsUsersRepository from '@modules/users/infra/typeorm/repositories/ClientsApplicationsUsersRepository';

import IClientsApplicationPermissionsRepository from '@modules/users/repositories/IClientsApplicationPermissionsRepository';
import ClientsApplicationPermissionsRepository from '@modules/users/infra/typeorm/repositories/ClientsApplicationPermissionsRepository';

import IClientsApplicationRolesRepository from '@modules/users/repositories/IClientsApplicationRolesRepository';
import ClientsApplicationRolesRepository from '@modules/users/infra/typeorm/repositories/ClientsApplicationRolesRepository';

container.registerSingleton<IHashProvider>('HashProvider', BCriptyHashProvider);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IMenusRepository>(
  'MenusRepository',
  MenusRepository,
);

container.registerSingleton<ISalesTablesRepository>(
  'SalesTablesRepository',
  SalesTablesRepository,
);

container.registerSingleton<ISalesTablesPriceRepository>(
  'SalesTablesPricesRepository',
  SalesTablesPriceRepository,
);

container.registerSingleton<ISalesTablesPricesServicesRepository>(
  'SalesTablesPricesServicesRepository',
  SalesTablesPricesServiceRepository,
);

container.registerSingleton<IClientsApplicationsUsersRepository>(
  'ClientsApplicationsUsersRepository',
  ClientsApplicationsUsersRepository,
);

container.registerSingleton<IClientsApplicationPermissionsRepository>(
  'ClientsApplicationPermissionsRepository',
  ClientsApplicationPermissionsRepository,
);

container.registerSingleton<IClientsApplicationRolesRepository>(
  'ClientsApplicationRolesRepository',
  ClientsApplicationRolesRepository,
);
