import { container } from 'tsyringe';

import IClientsRepository from '@modules/comercial/repositories/IClientsRepository';
import ClientsRepository from '@modules/comercial/infra/typeorm/repositories/ClientsRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);
