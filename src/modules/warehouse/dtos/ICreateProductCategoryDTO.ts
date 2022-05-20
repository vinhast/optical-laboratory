import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';

export default interface ICreateProductCategoryDTO {
  parent_id?: number;
  user_id?: number;
  name: string;
  description?: string;
  type?: string;
  ncm?: number;
  cst?: number;
  cfop?: number;
  cfop_out_of_state?: number;
  unit_type_id?: number;
  lense_type?: string;
  lense_side?: string;
  price?: string;
  spherical_start?: number;
  spherical_end?: number;
  cylindrical_start?: number;
  cylindrical_end?: number;
  addition_start?: number;
  addition_end?: number;
  online?: string;
  dir?: number;
  cover?: string;
  tables?: SaleTablePrice[];
}
