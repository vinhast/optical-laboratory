import { container } from 'tsyringe';

import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import ClientApplicationsRepository from '@shared/infra/typeorm/repositories/ClientApplicationsRepository';

container.registerSingleton<IClientApplicationsRepository>(
  'ClientApplicationsRepository',
  ClientApplicationsRepository,
);
