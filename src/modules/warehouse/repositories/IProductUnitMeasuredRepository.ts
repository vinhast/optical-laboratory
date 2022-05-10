import ProductUnitMeasured from '@modules/warehouse/infra/typeorm/entities/ProductUnitMeasured';
import ICreateProductUnitMeasuredDTO from '@modules/warehouse/dtos/ICreateProductUnitMeasuredDTO';

export default interface IProductUnitMeasuredRepository {
  findAll(): Promise<ProductUnitMeasured[]>;
  findById(id: number): Promise<ProductUnitMeasured | undefined>;
  findByName(name: string): Promise<ProductUnitMeasured | undefined>;
  create(data: ICreateProductUnitMeasuredDTO): Promise<ProductUnitMeasured>;
  save(productUnitMeasured: ProductUnitMeasured): Promise<ProductUnitMeasured>;
  delete(id: number): Promise<void>;
}
