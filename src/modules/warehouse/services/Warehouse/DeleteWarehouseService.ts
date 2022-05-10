import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IWarehousesRepository from '@modules/warehouse/repositories/IWarehouseRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteWarehouseService {
  constructor(
    @inject('WarehousesRepository')
    private warehousesRepository: IWarehousesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const warehouse = await this.warehousesRepository.findById(id);

    if (!warehouse) {
      throw new AppError('Warehouse not found.', 404);
    }

    await this.cacheProvider.invalidate(`warehouse-list`);
    await this.cacheProvider.invalidate(`Warehouse-get-${id}`);

    await this.warehousesRepository.delete(id);

    return true;
  }
}

export default DeleteWarehouseService;
