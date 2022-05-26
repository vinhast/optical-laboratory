import { container } from 'tsyringe';

import IInterApiProvider from '@shared/contanier/providers/InterApiProvider/models/IInterApiProvider';
import InterApiProvider from '@shared/contanier/providers/InterApiProvider/implementations/InterApiProvider';

container.registerSingleton<IInterApiProvider>(
  'InterApiProvider',
  InterApiProvider,
);
