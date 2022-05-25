import PaymentModule from '@modules/financial/infra/typeorm/entities/PaymentModule';
import ICreatePaymentModuleDTO from '@modules/financial/dtos/ICreatePaymentModuleDTO';

export default interface IPaymentModulesRepository {
  findAll(): Promise<PaymentModule[]>;
  findById(id: number): Promise<PaymentModule | undefined>;
  create(data: ICreatePaymentModuleDTO): Promise<PaymentModule>;
  save(role: PaymentModule): Promise<PaymentModule>;
  delete(id: number): Promise<void>;
}
