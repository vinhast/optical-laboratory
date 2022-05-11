import ICreateClientApplicationDTO from '@shared/dtos/ICreateClientApplicationDTO';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';

export default interface IClientApplicationsRepository {
  findAll(): Promise<ClientApplication[]>;
  findById(id: number): Promise<ClientApplication | undefined>;
  findByEmail(email: string): Promise<ClientApplication | undefined>;
  findByUsername(username: string): Promise<ClientApplication | undefined>;
  create(data: ICreateClientApplicationDTO): Promise<ClientApplication>;
  save(ClientApplication: ClientApplication): Promise<ClientApplication>;
  delete(id: number): Promise<void>;
}
