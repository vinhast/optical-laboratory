import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from '@shared/contanier/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/contanier/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/contanier/providers/MailProvider/implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
