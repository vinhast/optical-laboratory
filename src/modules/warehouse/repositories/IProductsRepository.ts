import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import ICreateProductDTO from '@modules/warehouse/dtos/ICreateProductDTO';

export default interface IProductCategoriesRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  create(params: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
