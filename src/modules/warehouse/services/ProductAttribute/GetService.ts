import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ProductAttribute from '@modules/warehouse/infra/typeorm/entities/ProductAttribute';
import IProductAttributesRepository from '@modules/warehouse/repositories/IProductAttributesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<ProductAttribute> {
    const cacheKey = `product-attribute-get-${id}`;
    let attribute = await this.cacheProvider.recover<
      ProductAttribute | undefined
    >(cacheKey);

    if (!attribute) {
      attribute = await this.productAttributesRepository.findById(id);
      await this.cacheProvider.save(cacheKey, classToClass(attribute));
    }

    if (!attribute) {
      throw new AppError('Attribute not found.', 404);
    }

    return attribute;
  }
}

export default GetService;
