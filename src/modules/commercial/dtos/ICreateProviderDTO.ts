export default interface ICreateProviderDTO {
  company_social_name: string;
  company_name: string;
  cnpj?: string;
  phone: string;
  mobile?: string;
  email?: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  zip_code?: string;
  city?: string;
  state?: string;
  ibge?: number;
  note?: string;
  active: string;
}
