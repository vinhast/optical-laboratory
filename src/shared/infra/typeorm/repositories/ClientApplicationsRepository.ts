import { getRepository, Repository } from 'typeorm';

import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import ICreateClientApplicationsDTO from '@shared/dtos/ICreateClientApplicationDTO';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';

class ClientApplicationsRepository implements IClientApplicationsRepository {
  private ormRepository: Repository<ClientApplication>;

  constructor() {
    this.ormRepository = getRepository(ClientApplication);
  }

  public async findAll(): Promise<ClientApplication[]> {
    const clientApplications = await this.ormRepository.find();
    return clientApplications;
  }

  public async findByEmail(
    email: string,
  ): Promise<ClientApplication | undefined> {
    const clientApplication = await this.ormRepository.findOne({
      where: { email },
    });
    return clientApplication;
  }
  public async findByCnpj(
    cnpj: string,
  ): Promise<ClientApplication | undefined> {
    const clientApplication = await this.ormRepository.findOne({
      where: { cnpj },
    });
    return clientApplication;
  }

  public async findByUsername(
    username: string,
  ): Promise<ClientApplication | undefined> {
    const clientApplication = await this.ormRepository.findOne({
      where: { username },
    });
    return clientApplication;
  }

  public async findById(id: number): Promise<ClientApplication | undefined> {
    const clientApplication = await this.ormRepository.findOne(id);
    return clientApplication;
  }

  public async create(
    clientApplicationsData: ICreateClientApplicationsDTO,
  ): Promise<ClientApplication> {
    const clientApplications = this.ormRepository.create(
      clientApplicationsData,
    );

    await this.ormRepository.save(clientApplications);

    return clientApplications;
  }

  public save(
    clientApplications: ClientApplication,
  ): Promise<ClientApplication> {
    return this.ormRepository.save(clientApplications);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ClientApplicationsRepository;
