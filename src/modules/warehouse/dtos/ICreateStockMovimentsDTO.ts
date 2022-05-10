import Stock from '@modules/warehouse/infra/typeorm/entities/Stock';
import {
  TypeDirectionMovimentation,
  TypeStatusMovimentation,
} from '../infra/typeorm/entities/StockMoviments';

export default interface ICreateStockMovimentsDTO {
  direction: TypeDirectionMovimentation;
  status: TypeStatusMovimentation;
  stock: Stock;
  warehouse_id: number;
  model?: string;
  model_id?: number;
  user_id: number;
  user_down_id: number;
}
