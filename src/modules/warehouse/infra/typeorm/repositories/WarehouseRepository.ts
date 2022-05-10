import { getRepository, Repository } from 'typeorm';

import IWarehouseRepository from '@modules/warehouse/repositories/IWarehouseRepository';
import ICreatewarehouseDTO from '@modules/warehouse/dtos/ICreateWarehouseDTO';

import Warehouse from '../entities/Warehouse';

class WarehouseRepository implements IWarehouseRepository {
  private ormRepository: Repository<Warehouse>;

  constructor() {
    this.ormRepository = getRepository(Warehouse);
  }

  public async findById(id: number): Promise<Warehouse | undefined> {
    const warehouse = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return warehouse;
  }

  public async findByName(name: string): Promise<Warehouse | undefined> {
    const warehouse = await this.ormRepository.findOne({ name });
    return warehouse;
  }

  public async findAllWarehouses(): Promise<Warehouse[]> {
    const warehouse = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
    return warehouse;
  }

  public async create(warehouseData: ICreatewarehouseDTO): Promise<Warehouse> {
    const warehouse = this.ormRepository.create({
      ...warehouseData,
      details: JSON.stringify(warehouseData.details),
    });

    await this.ormRepository.save(warehouse);

    return warehouse;
  }

  public save(warehouse: Warehouse): Promise<Warehouse> {
    return this.ormRepository.save(warehouse);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default WarehouseRepository;
