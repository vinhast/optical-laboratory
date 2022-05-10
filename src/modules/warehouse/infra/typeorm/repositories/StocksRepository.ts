import { getManager, getRepository, Repository } from 'typeorm';
import IStocksRepository from '@modules/warehouse/repositories/IStocksRepository';
import Stock from '@modules/warehouse/infra/typeorm/entities/Stock';
import StockMoviments from '../entities/StockMoviments';

class StocksRepository implements IStocksRepository {
  private ormRepository: Repository<Stock>;
  private ormRepositoryStockMoviments: Repository<StockMoviments>;

  constructor() {
    this.ormRepository = getRepository(Stock);
    this.ormRepositoryStockMoviments = getRepository(StockMoviments);
  }
  async findById(id: number): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne(id);
    return stock;
  }

  public async findAll(): Promise<Stock[]> {
    const stocks = await this.ormRepository.find();
    return stocks;
  }

  public async findEmptyStocks(): Promise<Stock[]> {
    const stocks = await this.ormRepository.find({
      where: { current_stock: 0 },
    });
    return stocks;
  }

  public async findPendingStocks(): Promise<Stock[]> {
    const stocks = await getManager()
      .getRepository(Stock)
      .createQueryBuilder()
      .where('current_stock > 0 AND current_stock < replacement_point')
      .getMany();

    return stocks;
  }

  public async findSaleStocks(): Promise<Stock[]> {
    const stocks = await getManager()
      .createQueryBuilder(Stock, 'stocks')
      .innerJoinAndSelect('stocks.product', 'product')
      .where('product.type = "revenda" OR product.type = "venda"')
      .getMany();

    return stocks;
  }

  public async delete(id: number): Promise<void> {
    let hasMoviments = false;
    const movimentsIds: number[] = [];
    const movients = await this.ormRepositoryStockMoviments.findAndCount({
      where: { stock_id: id },
    });
    if (movients[1] > 1) hasMoviments = true;
    movients[0].forEach(m => movimentsIds.push(m.id));

    if (hasMoviments) {
      throw new Error('Product in use!');
    }
    if (movimentsIds.length)
      await this.ormRepositoryStockMoviments.delete(movimentsIds);
    await this.ormRepository.delete(id);
  }
}

export default StocksRepository;
