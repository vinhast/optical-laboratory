import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductAttribute from '@modules/warehouse/infra/typeorm/entities/ProductAttribute';
import IProductAttributesRepository from '@modules/warehouse/repositories/IProductAttributesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  parent_id?: number;
}

@injectable()
class CreateService {
  constructor(
    @inject('ProductAttributesRepository')
    private productAttributesRepository: IProductAttributesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    parent_id,
  }: IRequest): Promise<ProductAttribute> {
    let attribute = await this.productAttributesRepository.findByName(name);
    if (attribute) {
      throw new AppError('Attribute already exists.');
    }

    attribute = await this.productAttributesRepository.create({
      name,
      parent_id,
    });

    await this.cacheProvider.invalidate('product-attribute-list');
    if (parent_id) {
      await this.cacheProvider.invalidate(`product-attribute-get-${parent_id}`);
    }

    return attribute;
  }
}

export default CreateService;
