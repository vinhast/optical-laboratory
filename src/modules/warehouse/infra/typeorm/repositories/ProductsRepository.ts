import { getRepository, Repository } from 'typeorm';
import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/warehouse/dtos/ICreateProductDTO';
import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';

class ProductsRepository extends MainRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(Product);
    super(repository);
    this.ormRepository = repository;
    this.userData = httpContext.get('user');
  }

  public async findByCategoryId(category_id: number): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: {
        category_id,
        client_application_id: this.userData.client_application_id,
      },
    });
    return products;
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);
    await this.ormRepository.save(product);
    return product;
  }

  public save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProductsRepository;
