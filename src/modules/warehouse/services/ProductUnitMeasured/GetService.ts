import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ProductUnitMeasured from '@modules/warehouse/infra/typeorm/entities/ProductUnitMeasured';
import IProductUnitMeasuredRepository from '@modules/warehouse/repositories/IProductUnitMeasuredRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('ProductUnitMeasuredRepository')
    private productUnitMeasuredRepository: IProductUnitMeasuredRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<ProductUnitMeasured> {
    const cacheKey = `product-unit-measured-get-${id}`;
    let unitMeasured = await this.cacheProvider.recover<
      ProductUnitMeasured | undefined
    >(cacheKey);

    if (!unitMeasured) {
      unitMeasured = await this.productUnitMeasuredRepository.findById(id);
      await this.cacheProvider.save(cacheKey, classToClass(unitMeasured));
    }

    if (!unitMeasured) {
      throw new AppError('Unit Measured not found.', 404);
    }

    return unitMeasured;
  }
}

export default GetService;
