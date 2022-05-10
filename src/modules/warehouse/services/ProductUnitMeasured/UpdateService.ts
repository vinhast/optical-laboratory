import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductUnitMeasured from '@modules/warehouse/infra/typeorm/entities/ProductUnitMeasured';
import IProductUnitMeasuredRepository from '@modules/warehouse/repositories/IProductUnitMeasuredRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
  name: string;
}

@injectable()
class UpdateService {
  constructor(
    @inject('ProductUnitMeasuredRepository')
    private productUnitMeasuredRepository: IProductUnitMeasuredRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, name }: IRequest): Promise<ProductUnitMeasured> {
    const cacheKey = `product-unit-measured-get-${id}`;
    let unitMeasured = await this.cacheProvider.recover<
      ProductUnitMeasured | undefined
    >(cacheKey);

    if (!unitMeasured) {
      unitMeasured = await this.productUnitMeasuredRepository.findById(id);
    }

    if (!unitMeasured) {
      throw new AppError('Unit Measured not found.', 404);
    }

    unitMeasured.name = name;

    await this.cacheProvider.invalidate(`product-unit-measured-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.productUnitMeasuredRepository.save(unitMeasured);

    return unitMeasured;
  }
}

export default UpdateService;
