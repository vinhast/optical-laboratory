import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductUnitMeasuredRepository from '@modules/warehouse/repositories/IProductUnitMeasuredRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('ProductUnitMeasuredRepository')
    private productUnitMeasuredRepository: IProductUnitMeasuredRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const cacheKey = `product-unit-measured-get-${id}`;
    const unitMeasured = await this.productUnitMeasuredRepository.findById(id);

    if (!unitMeasured) {
      throw new AppError('Unit Measured not found.', 404);
    }

    await this.cacheProvider.invalidate(cacheKey);
    await this.cacheProvider.invalidate('product-unit-measured-list');

    await this.productUnitMeasuredRepository.delete(id);

    return true;
  }
}

export default DeleteService;
