export default interface ICreateProductCategoryDTO {
  parent_id?: number;
  user_id?: number;
  name: string;
  description?: string;
  type?: string;
  ncm?: number;
  cst?: number;
  cfop?: number;
  unit_type_id?: number;
  price?: string;
  spherical_start?: number;
  spherical_end?: number;
  cylindrical_start?: number;
  cylindrical_end?: number;
}
