import ICreateClientDTO from '../dtos/ICreateClientDTO';
import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client | undefined>;
  create(Client: ICreateClientDTO): Promise<Client>;
  save(Client: Client): Promise<Client>;
  delete(id: number): Promise<void>;
}
