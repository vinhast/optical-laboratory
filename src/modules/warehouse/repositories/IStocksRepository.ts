import Stock from '@modules/warehouse/infra/typeorm/entities/Stock';

export default interface IStocksRepository {
  findAll(): Promise<Stock[]>;
  findEmptyStocks(): Promise<Stock[]>;
  findPendingStocks(): Promise<Stock[]>;
  findSaleStocks(): Promise<Stock[]>;
  findById(id: number): Promise<Stock | undefined>;
  delete(id: number): Promise<void>;
}
