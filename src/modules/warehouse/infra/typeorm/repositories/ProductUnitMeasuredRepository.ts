import { getRepository, Repository } from 'typeorm';

import IProductUnitMeasuredRepository from '@modules/warehouse/repositories/IProductUnitMeasuredRepository';
import ICreateProductUnitMeasuredDTO from '@modules/warehouse/dtos/ICreateProductUnitMeasuredDTO';

import ProductUnitMeasured from '@modules/warehouse/infra/typeorm/entities/ProductUnitMeasured';

class ProductUnitMeasuredRepository implements IProductUnitMeasuredRepository {
  private ormRepository: Repository<ProductUnitMeasured>;

  constructor() {
    this.ormRepository = getRepository(ProductUnitMeasured);
  }

  public async findAll(): Promise<ProductUnitMeasured[]> {
    const productUnitMeasured = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
    return productUnitMeasured;
  }

  public async findById(id: number): Promise<ProductUnitMeasured | undefined> {
    const productUnitMeasured = await this.ormRepository.findOne(id);
    return productUnitMeasured;
  }

  public async findByName(
    name: string,
  ): Promise<ProductUnitMeasured | undefined> {
    const productUnitMeasured = await this.ormRepository.findOne({ name });
    return productUnitMeasured;
  }

  public async create(
    productUnitMeasuredData: ICreateProductUnitMeasuredDTO,
  ): Promise<ProductUnitMeasured> {
    const productUnitMeasured = this.ormRepository.create(
      productUnitMeasuredData,
    );

    await this.ormRepository.save(productUnitMeasured);

    return productUnitMeasured;
  }

  public save(
    productUnitMeasured: ProductUnitMeasured,
  ): Promise<ProductUnitMeasured> {
    return this.ormRepository.save(productUnitMeasured);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProductUnitMeasuredRepository;
