import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListGenerateRevenue {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<ProductCategory[]> {
    return this.productCategoriesRepository.findGenerateRevenue();
  }
}

export default ListGenerateRevenue;
