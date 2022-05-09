import { container } from 'tsyringe';

import IClientsRepository from '@modules/commercial/repositories/IClientsRepository';
import ClientsRepository from '@modules/commercial/infra/typeorm/repositories/ClientsRepository';

import IOrderProductsRepository from '@modules/commercial/repositories/IOrderProductsRepository';
import OrderProductsRepository from '@modules/commercial/infra/typeorm/repositories/OrderProductsRepository';

import IOrderRepository from '@modules/commercial/repositories/IOrderRepository';
import OrderRepository from '@modules/commercial/infra/typeorm/repositories/OrderRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IOrderProductsRepository>(
  'OrderProductsRepository',
  OrderProductsRepository,
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
