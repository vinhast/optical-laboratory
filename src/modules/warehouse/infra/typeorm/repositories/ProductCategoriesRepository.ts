import { getRepository, Repository } from 'typeorm';

import IProductCategoriesRepository from '@modules/warehouse/repositories/IProductCategoriesRepository';
import ICreateProductCategoryDTO from '@modules/warehouse/dtos/ICreateProductCategoryDTO';

import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class ProductCategoriesRepository
  extends MainRepository
  implements IProductCategoriesRepository
{
  private ormRepository: Repository<ProductCategory>;

  constructor() {
    const repository = getRepository(ProductCategory);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    productCategoryData: ICreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const productCategory = this.ormRepository.create(productCategoryData);

    await this.ormRepository.save(productCategory);

    return productCategory;
  }

  public save(productCategory: ProductCategory): Promise<ProductCategory> {
    return this.ormRepository.save(productCategory);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProductCategoriesRepository;
