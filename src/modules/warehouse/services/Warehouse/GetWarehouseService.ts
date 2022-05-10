import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import Warehouse from '@modules/warehouse/infra/typeorm/entities/Warehouse';
import IWarehousesRepository from '@modules/warehouse/repositories/IWarehouseRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehouseRepository: IWarehousesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Warehouse> {
    const cacheKey = `Warehouse-get-${id}`;
    let warehouse = await this.cacheProvider.recover<Warehouse | undefined>(
      cacheKey,
    );

    if (!warehouse) {
      warehouse = await this.warehouseRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(warehouse));
    }

    if (!warehouse) {
      throw new AppError('warehouse not found.', 404);
    }

    return warehouse;
  }
}

export default GetWarehouseService;
