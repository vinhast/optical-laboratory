import { getRepository, Repository } from 'typeorm';
import ICreateStockMovimentDTO from '@modules/warehouse/dtos/ICreateStockMovimentDTO';
import IStockMovimentsRepository from '@modules/warehouse/repositories/IStockMovimentsRepository';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import StockMoviment from '../entities/StockMoviment';

class StockMovimentsRepository
  extends MainRepository
  implements IStockMovimentsRepository
{
  private ormRepository: Repository<StockMoviment>;

  constructor() {
    const repository = getRepository(StockMoviment);
    super(repository);
    this.ormRepository = repository;
  }

  async create(
    stockMovimentData: ICreateStockMovimentDTO,
  ): Promise<StockMoviment> {
    const stockMoviment = this.ormRepository.create(stockMovimentData);
    await this.ormRepository.save(stockMoviment);
    return stockMoviment;
  }

  public save(stockMoviment: StockMoviment): Promise<StockMoviment> {
    return this.ormRepository.save(stockMoviment);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default StockMovimentsRepository;
