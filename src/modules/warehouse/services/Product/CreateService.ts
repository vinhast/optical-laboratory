import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import Product from '@modules/warehouse/infra/typeorm/entities/Product';

interface IRequest {
  product_category_id: number;
  side: string;
  cylindrical?: string;
  spherical?: string;
  addition?: string;
  price?: string;
  bars_code?: string;
  active: string;
}

@injectable()
class CreateService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_category_id,
    side,
    cylindrical,
    spherical,
    addition,
    price,
    bars_code,
    active,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      product_category_id,
      side,
      cylindrical,
      spherical,
      addition,
      price,
      bars_code,
      active,
    });

    await this.cacheProvider.invalidate(`products-list`);

    return product;
  }
}

export default CreateService;
