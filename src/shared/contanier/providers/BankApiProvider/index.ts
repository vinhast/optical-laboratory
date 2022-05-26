import { container } from 'tsyringe';

import IBankApiProvider from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';
import BankApiProvider from '@shared/contanier/providers/BankApiProvider/implementations/BankApiProvider';

import IInterApiProvider from '@shared/contanier/providers/BankApiProvider/models/IInterApiProvider';
import InterApiProvider from '@shared/contanier/providers/BankApiProvider/implementations/InterApiProvider';

container.registerSingleton<IBankApiProvider>(
  'BankApiProvider',
  BankApiProvider,
);

container.registerSingleton<IInterApiProvider>(
  'InterApiProvider',
  InterApiProvider,
);
