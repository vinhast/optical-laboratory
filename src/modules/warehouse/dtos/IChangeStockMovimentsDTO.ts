import { TypeStatusMovimentation } from '@modules/warehouse/infra/typeorm/entities/StockMoviments';
import Stock from '@modules/warehouse/infra/typeorm/entities/Stock';

export default interface IChangeStockMovimentsDTO {
  stock: Stock;
  status: TypeStatusMovimentation;
  user_down_id: number;
  warehouse_id: number;
  model?: string;
  model_id?: number;
  user_id: number;
}
