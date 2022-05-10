import Warehouse from '@modules/warehouse/infra/typeorm/entities/Warehouse';
import ICreateWarehouseDTO from '@modules/warehouse/dtos/ICreateWarehouseDTO';

export default interface IWarehousesRepository {
  findAllWarehouses(): Promise<Warehouse[]>;
  findById(id: number): Promise<Warehouse | undefined>;
  findByName(name: string): Promise<Warehouse | undefined>;
  create(data: ICreateWarehouseDTO): Promise<Warehouse>;
  save(Warehouse: Warehouse): Promise<Warehouse>;
  delete(id: number): Promise<void>;
}
