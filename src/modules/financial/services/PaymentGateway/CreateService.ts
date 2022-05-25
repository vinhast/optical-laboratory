import { inject, injectable } from 'tsyringe';

import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';
import httpContext from 'express-http-context';

interface IRequest {
  type: 'Boleto';
  credentials: any;
  payment_module_id: number;
  files?: any;
  user: {
    id: number;
    client_application_id: number;
    role_id: number;
  };
}

@injectable()
class CreateService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('StorageDiskProvider')
    private storageDiskProvider: IStorageProvider,
  ) {}

  public async execute({
    type,
    credentials,
    payment_module_id,
    files,
    user,
  }: IRequest): Promise<PaymentGateway> {
    const copyCredentials = { ...JSON.parse(credentials) };
    if (files?.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        const filename = await this.storageDiskProvider.saveFile(
          file.filename,
          user.client_application_id,
        );
        copyCredentials[file.fieldname] = filename;
      }
    }
    const paymentGateway = await this.paymentGatewaysRepository.create({
      credentials: copyCredentials,
      type,
      payment_module_id,
    });

    await this.cacheProvider.invalidate('payment-gateways-list');

    return paymentGateway;
  }
}

export default CreateService;
