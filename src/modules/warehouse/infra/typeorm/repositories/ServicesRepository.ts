/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getRepository, Repository } from 'typeorm';
import IServicesRepository from '@modules/warehouse/repositories/IServicesRepository';
import ICreateServiceDTO from '@modules/warehouse/dtos/ICreateServiceDTO';
import Service from '@modules/warehouse/infra/typeorm/entities/Service';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';
import httpContext from 'express-http-context';

class ServicesRepository extends MainRepository implements IServicesRepository {
  private myUser: {
    id: number;
    client_application_id: number;
    role_id: number;
  };
  private ormRepository: Repository<Service>;
  private ormSalesTablesServicesRepository: Repository<SaleTablePriceService>;

  constructor() {
    const repository = getRepository(Service);
    super(repository);
    this.ormRepository = repository;
    this.ormSalesTablesServicesRepository = getRepository(
      SaleTablePriceService,
    );
    this.myUser = httpContext.get('user');
  }

  public async findById(id: number): Promise<any | undefined> {
    const service = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id: this.myUser.client_application_id,
      },
    });
    const tables = await this.ormSalesTablesServicesRepository.find({
      where: {
        client_application_id: this.myUser.client_application_id,
        service_id: service?.id,
      },
    });
    return {
      ...service,
      tables,
    };
  }

  public async create(serviceData: ICreateServiceDTO): Promise<Service> {
    const service = this.ormRepository.create(serviceData);
    await this.ormRepository.save(service);
    if (serviceData.tables) {
      for (const table of serviceData.tables) {
        await this.ormSalesTablesServicesRepository.save({
          ...table,
          service_id: service.id,
        });
      }
    }
    return service;
  }

  public async save(service: ICreateServiceDTO): Promise<Service> {
    const serviceSave = await this.ormRepository.save(service);
    if (service.tables) {
      const tables = await this.ormSalesTablesServicesRepository.find({
        where: {
          client_application_id: this.myUser.client_application_id,
          service_id: serviceSave?.id,
        },
      });

      for (const table of service.tables) {
        const find = tables.find(
          t =>
            Number(t.client_application_id) ===
              Number(this.myUser.client_application_id) &&
            Number(t.table_id) === Number(table.table_id) &&
            Number(t.service_id) === Number(serviceSave.id),
        );
        await this.ormSalesTablesServicesRepository.save({
          ...find,
          ...table,
          service_id: serviceSave.id,
        });
      }
    }
    return serviceSave;
  }
}

export default ServicesRepository;
