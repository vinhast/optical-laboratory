export default interface ICreateSaleTablePriceServiceDTO {
  service_id: number;
  table_id: number;
  unit_price: string;
  wholesale_price: string;
  user_id?: number;
}
