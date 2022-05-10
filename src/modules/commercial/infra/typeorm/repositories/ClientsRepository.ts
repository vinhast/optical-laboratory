import { getRepository, Repository } from 'typeorm';

import IClientsRepository from '@modules/commercial/repositories/IClientsRepository';
import Client from '@modules/commercial/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/commercial/dtos/ICreateClientDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class ClientsRepository extends MainRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    const repository = getRepository(Client);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create(clientData);
    await this.ormRepository.save(client);
    return client;
  }

  public save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }
}

export default ClientsRepository;
