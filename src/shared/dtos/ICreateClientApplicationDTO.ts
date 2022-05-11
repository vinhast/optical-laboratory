export default interface ICreateClientApplicationDTO {
  name: string;
  email?: string;
  password: string;
  avatar?: string;
  cnpj: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone?: string;
  mobile?: string;
}
