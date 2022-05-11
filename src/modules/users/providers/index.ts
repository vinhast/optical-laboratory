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

import IClientsApplicationsUsersRepository from '@modules/users/repositories/IClientsApplicationsUsersRepository';
import ClientsApplicationsUsersRepository from '@modules/users/infra/typeorm/repositories/ClientsApplicationsUsersRepository';

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

container.registerSingleton<IClientsApplicationsUsersRepository>(
  'ClientsApplicationsUsersRepository',
  ClientsApplicationsUsersRepository,
);
