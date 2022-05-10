import StockMoviments from '@modules/warehouse/infra/typeorm/entities/StockMoviments';
import ICreateStockMovimentsDTO from '@modules/warehouse/dtos/ICreateStockMovimentsDTO';
// import IChangeStockMovimentsDTO from '@modules/warehouse/dtos/IChangeStockMovimentsDTO';

export type ResponseCauculateStockMoviments = {
  stock_id: number;
  result_cauculate: number;
};
export default interface IStockMoviments {
  create(params: ICreateStockMovimentsDTO): Promise<StockMoviments>;
  // change(params: IChangeStockMovimentsDTO): Promise<StockMoviments>;
  listAll(): Promise<ResponseCauculateStockMoviments[]>;
}
