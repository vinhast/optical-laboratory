import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class GetService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Product> {
    const cacheKey = `product-get-${id}`;
    let product = await this.cacheProvider.recover<Product | undefined>(
      cacheKey,
    );

    if (!product) {
      product = await this.productsRepository.findById(id);

      await this.cacheProvider.save(cacheKey, classToClass(product));
    }

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    return product;
  }
}

export default GetService;
