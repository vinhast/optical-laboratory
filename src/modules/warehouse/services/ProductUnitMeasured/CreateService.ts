import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductUnitMeasured from '@modules/warehouse/infra/typeorm/entities/ProductUnitMeasured';
import IProductUnitMeasuredRepository from '@modules/warehouse/repositories/IProductUnitMeasuredRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
}

@injectable()
class CreateService {
  constructor(
    @inject('ProductUnitMeasuredRepository')
    private productUnitMeasuredRepository: IProductUnitMeasuredRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<ProductUnitMeasured> {
    const checkExists = await this.productUnitMeasuredRepository.findByName(
      name,
    );
    if (checkExists) {
      throw new AppError('Unit Measured already exists.');
    }

    const unitMeasured = await this.productUnitMeasuredRepository.create({
      name,
    });

    await this.cacheProvider.invalidate('product-unit-measured-list');

    return unitMeasured;
  }
}

export default CreateService;
