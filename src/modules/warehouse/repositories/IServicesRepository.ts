import Service from '@modules/warehouse/infra/typeorm/entities/Service';
import ICreateServiceDTO from '@modules/warehouse/dtos/ICreateServiceDTO';

export default interface IServiceCategoriesRepository {
  findAll(): Promise<Service[]>;
  findById(id: number): Promise<Service | undefined>;
  create(params: ICreateServiceDTO): Promise<Service>;
  save(service: Service): Promise<Service>;
  delete(id: number): Promise<void>;
}
