import { inject, injectable } from 'tsyringe';

import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
  product_category_id: number;
  side: string;
  cylindrical: string;
  spherical: string;
  price?: string;
  bars_code?: string;
  active: string;
}
@injectable()
class UpdateService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(productUpdate: IRequest): Promise<Product> {
    const id = productUpdate.id;
    const cacheKey = `product-get-${id}`;
    let product = await this.cacheProvider.recover<Product | undefined>(
      cacheKey,
    );
    if (!product) {
      product = await this.productsRepository.findById(id);
    }
    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    product = {
      ...product,
      ...productUpdate,
    };

    await this.cacheProvider.invalidate(`products-list`);

    await this.cacheProvider.invalidate(cacheKey);

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateService;
