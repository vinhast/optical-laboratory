import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IWarehouseRepository from '@modules/warehouse/repositories/IWarehouseRepository';
import Warehouse from '@modules/warehouse/infra/typeorm/entities/Warehouse';

@injectable()
class ListWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehouseRepository: IWarehouseRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Warehouse[]> {
    const cacheKey = `warehouse-list`;
    let warehouses = await this.cacheProvider.recover<Warehouse[]>(cacheKey);

    if (!warehouses) {
      await this.cacheProvider.save(cacheKey, classToClass(warehouses));
      warehouses = await this.warehouseRepository.findAllWarehouses();
    }

    return warehouses;
  }
}

export default ListWarehouseService;
