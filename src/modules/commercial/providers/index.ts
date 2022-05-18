import { container } from 'tsyringe';

import IClientsRepository from '@modules/commercial/repositories/IClientsRepository';
import ClientsRepository from '@modules/commercial/infra/typeorm/repositories/ClientsRepository';

import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import OrderProductsRepository from '@modules/commercial/infra/typeorm/repositories/OrderProductsRepository';

import IOrdersRepository from '@modules/commercial/repositories/IOrdersRepository';
import OrdersRepository from '@modules/commercial/infra/typeorm/repositories/OrdersRepository';

import IProvidersRepository from '@modules/commercial/repositories/IProvidersRepository';
import ProvidersRepository from '@modules/commercial/infra/typeorm/repositories/ProvidersRepository';

import IDownloadsRepository from '@modules/commercial/repositories/IDownloadsRepository';
import DownloadsRepository from '@modules/commercial/infra/typeorm/repositories/DownloadsRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IOrderProductsRepository>(
  'OrderProductsRepository',
  OrderProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IDownloadsRepository>(
  'DownloadsRepository',
  DownloadsRepository,
);
