export default interface ICreateFinancialMovimentPaymentDTO {
  financial_moviment_id: number;
  payment_method: string;
  payment_gateway_id?: number;
  document_number?: string;
  digitable_line?: string;
  bar_code?: string;
  situation: 'Awaiting payment' | 'Paid' | 'Cancelled';
  nsu_date?: Date;
  payment_date?: Date;
  due_date: Date;
}
