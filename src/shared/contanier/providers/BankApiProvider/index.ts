import { container } from 'tsyringe';

import IBankApiProvider, {
  IBankApiResponse,
} from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';
import BankApiProvider from '@shared/contanier/providers/BankApiProvider/implementations/BankApiProvider';

import InterApiProvider from '@shared/contanier/providers/BankApiProvider/implementations/InterApiProvider';

container.registerSingleton<IBankApiProvider>(
  'BankApiProvider',
  BankApiProvider,
);

container.registerSingleton<IBankApiResponse>(
  'InterApiProvider',
  InterApiProvider,
);
