export default interface ICreatePaymentGatewayDTO {
  type: 'Boleto';
  credentials: string;
  payment_module_id: number;
}
