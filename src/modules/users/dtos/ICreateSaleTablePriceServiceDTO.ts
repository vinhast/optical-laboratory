export default interface ICreateSaleTablePriceServiceDTO {
  service_id: number;
  table_id: number;
  price: string;
  user_id?: number;
}
