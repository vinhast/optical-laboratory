import { inject, injectable } from 'tsyringe';

import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';

@injectable()
class SearchService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    product: Partial<Product>,
    client_id: number,
  ): Promise<{ products: Product[]; table: SaleTablePrice }> {
    const products = await this.productsRepository.findAllSearch(
      product,
      client_id,
    );
    return products;
  }
}

export default SearchService;
