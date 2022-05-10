import ProductAttribute from '@modules/warehouse/infra/typeorm/entities/ProductAttribute';
import ICreateProductAttributeDTO from '@modules/warehouse/dtos/ICreateProductAttributeDTO';

export default interface IProductAttributesRepository {
  findAll(): Promise<ProductAttribute[]>;
  findById(id: number): Promise<ProductAttribute | undefined>;
  findByName(name: string): Promise<ProductAttribute | undefined>;
  create(data: ICreateProductAttributeDTO): Promise<ProductAttribute>;
  save(productAttribute: ProductAttribute): Promise<ProductAttribute>;
  delete(id: number): Promise<void>;
}
