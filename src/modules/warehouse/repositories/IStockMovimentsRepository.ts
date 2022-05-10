import StockMoviment from '@modules/warehouse/infra/typeorm/entities/StockMoviment';
import ICreateStockMovimentDTO from '@modules/warehouse/dtos/ICreateStockMovimentDTO';

export default interface IStockMovimentsRepository {
  findAll(): Promise<StockMoviment[]>;
  findById(id: number): Promise<StockMoviment | undefined>;
  findByName(name: string): Promise<StockMoviment | undefined>;
  create(stockMoviment: ICreateStockMovimentDTO): Promise<StockMoviment>;
  save(stockMoviment: StockMoviment): Promise<StockMoviment>;
  delete(id: number): Promise<void>;
}
