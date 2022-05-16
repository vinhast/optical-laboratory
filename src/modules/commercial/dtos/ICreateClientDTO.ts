export default interface ICreateClientDTO {
  table_id: number;
  company_name: string;
  company_social_name?: string;
  cnpj: string;
  state_registration?: string;
  city_registration?: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  ibge?: number;
  phone_1?: string;
  phone_2?: string;
  mobile?: string;
  email?: string;
  note?: string;
  shipment_method?: string;
  payment_method?: string;
  active?: string;
  cnpjSearch?: string;
}
