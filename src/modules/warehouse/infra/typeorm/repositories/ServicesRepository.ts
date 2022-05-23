import { getRepository, Repository } from 'typeorm';
import IServicesRepository from '@modules/warehouse/repositories/IServicesRepository';
import ICreateServiceDTO from '@modules/warehouse/dtos/ICreateServiceDTO';
import Service from '@modules/warehouse/infra/typeorm/entities/Service';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class ServicesRepository extends MainRepository implements IServicesRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    const repository = getRepository(Service);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(serviceData: ICreateServiceDTO): Promise<Service> {
    const service = this.ormRepository.create(serviceData);
    await this.ormRepository.save(service);
    return service;
  }

  public save(service: Service): Promise<Service> {
    return this.ormRepository.save(service);
  }
}

export default ServicesRepository;
