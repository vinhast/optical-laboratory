import ProductCategory from '@modules/warehouse/infra/typeorm/entities/ProductCategory';
import ICreateProductCategoryDTO from '@modules/warehouse/dtos/ICreateProductCategoryDTO';
import IFindAllWithPaginationAndSearchDTO from '@shared/dtos/IFindAllWithPaginationAndSearchDTO';

interface IResponseFindAllWithPaginationAndSearch {
  productCategories: ProductCategory[];
  count: number;
}

export default interface IProductCategoriesRepository {
  findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch>;
  findAll(): Promise<ProductCategory[]>;
  findGenerateRevenue(): Promise<ProductCategory[]>;
  findById(id: number): Promise<ProductCategory | undefined>;
  findByName(name: string): Promise<ProductCategory | undefined>;
  create(data: ICreateProductCategoryDTO): Promise<ProductCategory>;
  save(productCategory: ProductCategory): Promise<ProductCategory>;
  delete(productCategory: ProductCategory): Promise<void>;
}
