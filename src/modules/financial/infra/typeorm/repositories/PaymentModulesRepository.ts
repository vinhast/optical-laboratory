import { getRepository, Repository } from 'typeorm';

import ICreatePaymentModuleDTO from '@modules/financial/dtos/ICreatePaymentModuleDTO';

import PaymentModule from '@modules/financial/infra/typeorm/entities/PaymentModule';
import IPaymentModulesRepository from '@modules/financial/repositories/IPaymentModulesRepository';

class PaymentModulesRepository implements IPaymentModulesRepository {
  private ormRepository: Repository<PaymentModule>;

  constructor() {
    this.ormRepository = getRepository(PaymentModule);
  }
  public async findById(id: number): Promise<PaymentModule | undefined> {
    const paymentModule = await this.ormRepository.findOne(id);
    return paymentModule;
  }

  public async findAll(): Promise<any[]> {
    const paymentModules = await this.ormRepository.find();
    return paymentModules;
  }

  public async create(
    paymentModuleData: ICreatePaymentModuleDTO,
  ): Promise<PaymentModule> {
    const paymentModule = this.ormRepository.create(paymentModuleData);

    await this.ormRepository.save(paymentModule);

    return paymentModule;
  }

  public save(paymentModule: PaymentModule): Promise<PaymentModule> {
    return this.ormRepository.save(paymentModule);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PaymentModulesRepository;
