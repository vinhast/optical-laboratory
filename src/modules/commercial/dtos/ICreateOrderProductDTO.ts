export default interface ICreateOrderProductDTO {
  order_id: number;
  product_id: number;
  initial_price: string;
  single_discount?: string;
  total_discount?: string;
  charged_value: string;
  cashback_value?: string;
  taxes?: string;
  quantity: number;
  wrap?: boolean;
  released?: boolean;
  cfop?: number;
}
