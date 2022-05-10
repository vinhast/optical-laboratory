import { getRepository, IsNull, Repository } from 'typeorm';

import IProductAttributesRepository from '@modules/warehouse/repositories/IProductAttributesRepository';
import ICreateProductAttributeDTO from '@modules/warehouse/dtos/ICreateProductAttributeDTO';

import ProductAttribute from '@modules/warehouse/infra/typeorm/entities/ProductAttribute';

class ProductAttributesRepository implements IProductAttributesRepository {
  private ormRepository: Repository<ProductAttribute>;

  constructor() {
    this.ormRepository = getRepository(ProductAttribute);
  }

  public async findAll(): Promise<ProductAttribute[]> {
    const productAttributes = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
    return productAttributes;
  }

  public async findById(id: number): Promise<ProductAttribute | undefined> {
    const productAttribute = await this.ormRepository.findOne(id);
    return productAttribute;
  }

  public async findByName(name: string): Promise<ProductAttribute | undefined> {
    const productAttribute = await this.ormRepository.findOne({ name });
    return productAttribute;
  }

  public async create(
    productAttributeData: ICreateProductAttributeDTO,
  ): Promise<ProductAttribute> {
    const productAttribute = this.ormRepository.create(productAttributeData);

    await this.ormRepository.save(productAttribute);

    return productAttribute;
  }

  public save(productAttribute: ProductAttribute): Promise<ProductAttribute> {
    return this.ormRepository.save(productAttribute);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProductAttributesRepository;
