import { getRepository, Repository } from 'typeorm';

import ICreatePaymentGatewayDTO from '@modules/financial/dtos/ICreatePaymentGatewayDTO';

import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import IPaymentGatewaysRepository from '@modules/financial/repositories/IPaymentGatewaysRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';

class PaymentGatewaysRepository
  extends MainRepository
  implements IPaymentGatewaysRepository
{
  private ormRepository: Repository<PaymentGateway>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(PaymentGateway);
    super(repository);
    this.ormRepository = repository;
    this.userData = httpContext.get('user');
  }

  public async findAll(): Promise<PaymentGateway[]> {
    this.userData = httpContext.get('user');
    const paymentGateways = await this.ormRepository.find({
      where: {
        client_application_id: this.userData.client_application_id,
      },
      relations: ['paymentModule'],
    });
    return paymentGateways;
  }

  public async findAllByClientApplication(
    client_application_id: number,
  ): Promise<PaymentGateway[]> {
    const paymentGateways = await this.ormRepository.find({
      where: {
        client_application_id,
      },
      relations: ['paymentModule'],
    });
    return paymentGateways;
  }

  public async create(
    paymentGatewayData: ICreatePaymentGatewayDTO,
  ): Promise<PaymentGateway> {
    const paymentGateway = this.ormRepository.create(paymentGatewayData);

    await this.ormRepository.save(paymentGateway);

    return paymentGateway;
  }

  public save(paymentGateway: PaymentGateway): Promise<PaymentGateway> {
    return this.ormRepository.save(paymentGateway);
  }
}

export default PaymentGatewaysRepository;
