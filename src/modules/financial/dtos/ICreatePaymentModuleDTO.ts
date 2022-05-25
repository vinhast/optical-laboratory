export default interface ICreatePaymentModuleDTO {
  type: 'Boleto';
  name: string;
  module: string;
  fields: string;
}
