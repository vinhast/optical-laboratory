import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Product[]> {
    const cacheKey = `products-list`;
    let products = await this.cacheProvider.recover<Product[]>(cacheKey);
    if (!products) {
      products = await this.productsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(products));
    }
    return products;
  }
}

export default ListService;
