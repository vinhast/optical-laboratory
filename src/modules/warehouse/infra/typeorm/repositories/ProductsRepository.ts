import { getRepository, Repository } from 'typeorm';
import IProductsRepository from '@modules/warehouse/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/warehouse/dtos/ICreateProductDTO';
import Product from '@modules/warehouse/infra/typeorm/entities/Product';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';
import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';
import Client from '@modules/commercial/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';

class ProductsRepository extends MainRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;
  private ormSalesTablesPricesRepository: Repository<SaleTablePrice>;
  private ormClientsRepository: Repository<Client>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(Product);
    super(repository);
    this.ormRepository = repository;
    this.ormSalesTablesPricesRepository = getRepository(SaleTablePrice);
    this.ormClientsRepository = getRepository(Client);
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

  public async findAllSearch(
    product: Partial<Product>,
    client_id: number,
  ): Promise<{ products: Product[]; table: SaleTablePrice }> {
    const client = await this.ormClientsRepository.findOne({
      where: {
        client_application_id: this.userData.client_application_id,
        id: client_id,
      },
    });
    const table = await this.ormSalesTablesPricesRepository.findOne({
      where: {
        client_application_id: this.userData.client_application_id,
        product_category_id: product?.product_category_id,
        table_id: client?.table_id,
      },
    });
    if (!table) {
      throw new AppError('no table');
    }
    const products = await this.ormRepository.find({
      where: {
        ...product,
        client_application_id: this.userData.client_application_id,
      },
    });
    return {
      products,
      table,
    };
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);
    await this.ormRepository.save(product);
    return product;
  }

  public save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
