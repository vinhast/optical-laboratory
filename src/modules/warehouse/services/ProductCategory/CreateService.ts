import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  parent_id?: number;
  user_id?: number;
  name: string;
  description?: string;
  type?: string;
  ncm?: number;
  cst?: number;
  cfop?: number;
  unit_type_id?: number;
  price?: string;
  spherical_start?: number;
  spherical_end?: number;
  cylindrical_start?: number;
  cylindrical_end?: number;
}

@injectable()
class CreateService {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    parent_id,
    user_id,
    name,
    description,
    type,
    ncm,
    cst,
    cfop,
    unit_type_id,
    price,
    spherical_start,
    spherical_end,
    cylindrical_start,
    cylindrical_end,
  }: IRequest): Promise<ProductCategory> {
    let category = await this.productCategoriesRepository.findByName(name);
    if (category) {
      throw new AppError('Category already exists.');
    }

    category = await this.productCategoriesRepository.create({
      parent_id,
      user_id,
      name,
      description,
      type,
      ncm,
      cst,
      cfop,
      unit_type_id,
      price,
      spherical_start,
      spherical_end,
      cylindrical_start,
      cylindrical_end,
    });

    await this.cacheProvider.invalidate('product-categories-list');
    if (parent_id) {
      await this.cacheProvider.invalidate(`product-category-get-${parent_id}`);
    }

    return category;
  }
}

export default CreateService;
