import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import ICreateProductCategoryDTO from '@modules/warehouse/dtos/ICreateProductCategoryDTO';

export default interface IProductCategoriesRepository {
  findAll(): Promise<ProductCategory[]>;
  findById(id: number): Promise<ProductCategory | undefined>;
  findByName(name: string): Promise<ProductCategory | undefined>;
  create(data: ICreateProductCategoryDTO): Promise<ProductCategory>;
  save(productCategory: ProductCategory): Promise<ProductCategory>;
  delete(id: number): Promise<void>;
}
