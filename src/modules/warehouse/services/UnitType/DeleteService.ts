import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUnitTypesRepository from '@modules/warehouse/repositories/IUnitTypesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('UnitTypesRepository')
    private unitTypesRepository: IUnitTypesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const cacheKey = `product-unit-type-get-${id}`;
    const unitType = await this.unitTypesRepository.findById(id);

    if (!unitType) {
      throw new AppError('Unit type not found.', 404);
    }

    await this.cacheProvider.invalidate(`product-unit-type-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.unitTypesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
