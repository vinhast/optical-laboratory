/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { getRepository, Repository } from 'typeorm';
import ICreateStockMovimentDTO from '@modules/warehouse/dtos/ICreateStockMovimentDTO';
import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';
import StockMoviment from '../entities/StockMoviment';
import Product from '../entities/Product';

class StockMovimentsRepository
  extends MainRepository
  implements IStockMovimentsRepository
{
  private myUser: {
    id: number;
    client_application_id: number;
    role_id: number;
  };
  private ormRepository: Repository<StockMoviment>;
  private ormProductCategorieRepository: Repository<Product>;

  constructor() {
    const repository = getRepository(StockMoviment);
    super(repository);
    this.ormRepository = repository;
    this.ormProductCategorieRepository = getRepository(Product);
  }

  async create(
    stockMovimentData: ICreateStockMovimentDTO,
  ): Promise<StockMoviment> {
    const stockMoviment = this.ormRepository.create(stockMovimentData);
    await this.ormRepository.save(stockMoviment);
    return stockMoviment;
  }

  async createMany(stocks: any[]): Promise<StockMoviment[]> {
    this.myUser = httpContext.get('user');
    const products = await this.ormProductCategorieRepository.find({
      where: {
        client_application_id: this.myUser.client_application_id,
      },
    });
    for (const s of stocks) {
      const product = products.find(
        p => p.cylindrical === s.cylindrical && p.spherical === s.spherical,
      );
      if (product?.id) {
        await this.ormRepository.save({
          type: 'C',
          origin: 'E',
          description: 'D',
          financial_moviment_id: 0,
          product_id: product.id,
          quantity: Number(s.value),
          user_id: this.myUser.id,
        });
      }
    }
    return [];
  }

  public save(stockMoviment: StockMoviment): Promise<StockMoviment> {
    return this.ormRepository.save(stockMoviment);
  }
}

export default StockMovimentsRepository;
