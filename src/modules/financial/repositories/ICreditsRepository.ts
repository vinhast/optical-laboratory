import ICreateCreditDTO from '../dtos/ICreateCreditDTO';
import Credit from '../infra/typeorm/entities/Credit';

export default interface ICreditsRepository {
  findAll(): Promise<Credit[]>;
  findById(id: number): Promise<Credit | undefined>;
  create(Credit: ICreateCreditDTO): Promise<Credit>;
  save(Credit: Credit): Promise<Credit>;
  delete(id: number): Promise<void>;
}
