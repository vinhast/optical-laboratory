export default interface ICreateBankAccountDTO {
  name: string;
  registry?: string;
  agency?: string;
  account?: string;
  account_dv?: number;
  client_code?: number;
  assignor_code?: number;
  assignor_code_dv?: number;
  document?: string;
  transmission_code?: string;
  currency?: string;
  invoice_value?: number;
  delay_fines?: number;
  delay_taxes?: number;
  message_1?: string;
  message_2?: string;
  message_3?: string;
  instruction_1?: string;
  instruction_2?: string;
  instruction_3?: string;
  user_id?: number;
  username?: string;
  active: string;
}
