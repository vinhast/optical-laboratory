import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Warehouse from '@modules/warehouse/infra/typeorm/entities/Warehouse';
import IWarehousesRepository from '@modules/warehouse/repositories/IWarehouseRepository';

interface IRequest {
  id: number;
  name: string;
  details: string;
  active: boolean;
}

@injectable()
class UpdateWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    details,
    active,
  }: IRequest): Promise<Warehouse> {
    const cacheKey = `Warehouse-get-${id}`;
    let warehouse = await this.cacheProvider.recover<Warehouse | undefined>(
      cacheKey,
    );

    if (!warehouse) {
      warehouse = await this.warehousesRepository.findById(id);
    }

    if (!warehouse) {
      throw new AppError('warehouse not found.', 404);
    }

    warehouse.details = JSON.stringify(details);
    warehouse.name = name;
    warehouse.active = active;

    await this.cacheProvider.invalidate(`warehouse-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.warehousesRepository.save(warehouse);

    return warehouse;
  }
}

export default UpdateWarehouseService;
