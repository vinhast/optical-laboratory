export default interface ICreateProductDTO {
  product_category_id: number;
  side: string;
  cylindrical: string;
  spherical: string;
  price?: string;
  bars_code?: string;
  active: string;
}
