import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Warehouse from '@modules/warehouse/infra/typeorm/entities/Warehouse';
import IWarehouseRepository from '@modules/warehouse/repositories/IWarehouseRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  details: string;
  active: boolean;
}

@injectable()
class CreateWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehouseRepository: IWarehouseRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    active,
    details,
  }: IRequest): Promise<Warehouse> {
    let warehouse = await this.warehouseRepository.findByName(name);
    if (warehouse) {
      throw new AppError('Warehouse already exists.');
    }

    warehouse = await this.warehouseRepository.create({
      name,
      details,
      active,
    });

    await this.cacheProvider.invalidate('warehouse-list');

    return warehouse;
  }
}

export default CreateWarehouseService;
