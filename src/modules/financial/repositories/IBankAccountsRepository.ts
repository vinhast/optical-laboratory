import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';
import BankAccount from '../infra/typeorm/entities/BankAccount';

export default interface IBankAccountsRepository {
  findAll(): Promise<BankAccount[]>;
  findById(id: number): Promise<BankAccount | undefined>;
  create(BankAccount: ICreateBankAccountDTO): Promise<BankAccount>;
  save(BankAccount: BankAccount): Promise<BankAccount>;
  delete(id: number): Promise<void>;
}
