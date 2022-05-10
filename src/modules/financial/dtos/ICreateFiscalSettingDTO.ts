export default interface ICreateFiscalSettingDTO {
  company_name: string;
  cnpj: string;
  city_registration: string;
  state_registration?: string;
  address: string;
  nfse_env?: boolean;
  nfse_rps_number?: number;
  certified_file?: string;
  certified_validate?: Date;
  certified_password: string;
  nf_emission_due?: number;
  dir?: number;
  invoice_email_copy?: string;
  active: string;
}
