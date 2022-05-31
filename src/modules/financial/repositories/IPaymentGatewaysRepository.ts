import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import ICreatePaymentGatewayDTO from '@modules/financial/dtos/ICreatePaymentGatewayDTO';

export default interface IPaymentGatewaysRepository {
  findAll(): Promise<PaymentGateway[]>;
  findAllByClientApplication(
    client_application_id: number,
  ): Promise<PaymentGateway[]>;
  findById(id: number): Promise<PaymentGateway | undefined>;
  create(data: ICreatePaymentGatewayDTO): Promise<PaymentGateway>;
  save(role: PaymentGateway): Promise<PaymentGateway>;
  delete(id: number): Promise<void>;
}
