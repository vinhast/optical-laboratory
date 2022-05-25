import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import ICreateProductDTO from '@modules/warehouse/dtos/ICreateProductDTO';
import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';

export default interface IProductCategoriesRepository {
  findAll(): Promise<Product[]>;
  findAllSearch(
    product: Partial<Product>,
    client_id: number,
  ): Promise<{ products: Product[]; table: SaleTablePrice }>;
  findById(id: number): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(params: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
