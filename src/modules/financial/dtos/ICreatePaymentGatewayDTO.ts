import { ICredentials } from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';

export default interface ICreatePaymentGatewayDTO {
  type: 'Boleto';
  credentials: ICredentials;
  payment_module_id: number;
}
