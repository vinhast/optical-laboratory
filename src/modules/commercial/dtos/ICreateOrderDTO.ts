export default interface ICreateOrderDTO {
  os?: string;
  client_id: number;
  products_value?: string;
  service_value?: string;
  lenses_value?: string;
  charged_value?: string;
  credit_value?: string;
  shipping_method?: string;
  shipping_value?: string;
  shipping_time?: string;
  payment_method?: string;
  payment_date?: Date;
  installments?: number;
  status?: number;
  type: string;
  profit: string;
  note?: string;
  user_id?: number;
  products: any[];
  revenue: string;
}
