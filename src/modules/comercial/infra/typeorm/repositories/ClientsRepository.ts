import { getRepository, Repository } from 'typeorm';

import IClientsRepository from '@modules/comercial/repositories/IClientsRepository';
import Client from '@modules/comercial/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/comercial/dtos/ICreateClientDTO';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }
  public async findById(id: number): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);
    return client;
  }

  public async findAll(): Promise<Client[]> {
    const clients = await this.ormRepository.find();
    return clients;
  }

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create(clientData);
    await this.ormRepository.save(client);
    return client;
  }

  public save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ClientsRepository;
