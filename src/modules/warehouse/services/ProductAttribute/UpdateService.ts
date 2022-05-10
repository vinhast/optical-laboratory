import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductAttribute from '@modules/warehouse/infra/typeorm/entities/ProductAttribute';
import IProductAttributesRepository from '@modules/warehouse/repositories/IProductAttributesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
  parent_id?: number;
  name: string;
}

@injectable()
class UpdateService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    parent_id,
  }: IRequest): Promise<ProductAttribute> {
    const cacheKey = `product-attribute-get-${id}`;
    let attribute = await this.cacheProvider.recover<
      ProductAttribute | undefined
    >(cacheKey);

    if (!attribute) {
      attribute = await this.productAttributesRepository.findById(id);
    }

    if (!attribute) {
      throw new AppError('Attribute not found.', 404);
    }

    attribute.name = name;
    attribute.parent_id = parent_id;

    await this.cacheProvider.invalidate('product-attribute-list');
    await this.cacheProvider.invalidate(cacheKey);
    if (parent_id) {
      await this.cacheProvider.invalidate(`product-attribute-get-${parent_id}`);
    }

    await this.productAttributesRepository.save(attribute);

    return attribute;
  }
}

export default UpdateService;
