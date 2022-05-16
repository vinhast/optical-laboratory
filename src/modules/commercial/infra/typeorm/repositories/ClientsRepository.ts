import { getRepository, Repository } from 'typeorm';

import IClientsRepository from '@modules/commercial/repositories/IClientsRepository';
import Client from '@modules/commercial/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/commercial/dtos/ICreateClientDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';

class ClientsRepository extends MainRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(Client);
    super(repository);
    this.ormRepository = repository;
    this.userData = httpContext.get('user');
  }

  public async findById(id: number): Promise<any | undefined> {
    const client = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id: this.userData.client_application_id,
      },
      relations: ['table'],
    });
    return client;
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
