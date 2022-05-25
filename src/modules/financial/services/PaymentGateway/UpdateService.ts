import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  id: number;
  type: 'Boleto';
  credentials: any;
  payment_module_id: number;
  files?: any;
}

@injectable()
class UpdateService {
  constructor(
    @inject('PaymentGatewaysRepository')
    private paymentGatewaysRepository: IPaymentGatewaysRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('StorageDiskProvider')
    private storageDiskProvider: IStorageProvider,
  ) {}

  public async execute(
    paymentGatewayUpdate: IRequest,
  ): Promise<PaymentGateway> {
    const id = paymentGatewayUpdate.id;
    const credentials = paymentGatewayUpdate.credentials;
    const files = paymentGatewayUpdate.files;
    const cacheKey = `payment-gateway-get-${id}`;
    let paymentGateway = await this.cacheProvider.recover<
      PaymentGateway | undefined
    >(cacheKey);

    const copyCredentials = { ...JSON.parse(credentials) };
    if (files?.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        const filename = await this.storageDiskProvider.saveFile(file.filename);
        copyCredentials[file.fieldname] = filename;
      }
    }

    if (!paymentGateway) {
      paymentGateway = await this.paymentGatewaysRepository.findById(id);
    }

    if (!paymentGateway) {
      throw new AppError('Payment Gateway not found.', 404);
    }

    paymentGateway = {
      ...paymentGateway,
      ...paymentGatewayUpdate,
      credentials: copyCredentials,
    };

    await this.cacheProvider.invalidate(`payment-gateways-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.paymentGatewaysRepository.save(paymentGateway);

    return paymentGateway;
  }
}

export default UpdateService;
