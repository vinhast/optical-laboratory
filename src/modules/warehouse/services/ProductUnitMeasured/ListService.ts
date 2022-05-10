import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ProductUnitMeasured from '@modules/warehouse/infra/typeorm/entities/ProductUnitMeasured';
import IProductUnitMeasuredRepository from '@modules/warehouse/repositories/IProductUnitMeasuredRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('ProductUnitMeasuredRepository')
    private productUnitMeasuredRepository: IProductUnitMeasuredRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<ProductUnitMeasured[]> {
    const cacheKey = `product-unit-measured-list`;
    let unitMeasured = await this.cacheProvider.recover<ProductUnitMeasured[]>(
      cacheKey,
    );

    if (!unitMeasured) {
      unitMeasured = await this.productUnitMeasuredRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(unitMeasured));
    }

    return unitMeasured;
  }
}

export default ListService;
