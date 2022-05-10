import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ProductAttribute from '@modules/warehouse/infra/typeorm/entities/ProductAttribute';
import IProductAttributesRepository from '@modules/warehouse/repositories/IProductAttributesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<ProductAttribute[]> {
    const cacheKey = `product-attribute-list`;
    let attributes = await this.cacheProvider.recover<ProductAttribute[]>(
      cacheKey,
    );

    if (!attributes) {
      attributes = await this.productAttributesRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(attributes));
    }

    return attributes;
  }
}

export default ListService;
