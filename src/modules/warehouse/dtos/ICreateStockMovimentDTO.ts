export default interface ICreateStockMovimentDTO {
  product_id: number;
  order_id?: number;
  financial_moviment_id?: number;
  user_id: number;
  description: string;
  type: string;
  origin: string;
  quantity: number;
}
