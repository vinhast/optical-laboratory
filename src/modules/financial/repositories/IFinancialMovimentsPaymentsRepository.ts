import ICreateFinancialMovimentPaymentDTO from '../dtos/ICreateFinancialMovimentPaymentDTO';
import FinancialMovimentPayment from '../infra/typeorm/entities/FinancialMovimentPayment';

interface IFindByDocumentNumber {
  document_number: string;
  client_application_id: number;
}

interface IFindById {
  id: number;
  client_application_id: number;
}

export default interface IFinancialMovimentPaymentsRepository {
  findById({
    client_application_id,
    id,
  }: IFindById): Promise<FinancialMovimentPayment | undefined>;
  findByFinancialMovimentId(
    financial_moviment_id: number,
  ): Promise<FinancialMovimentPayment | undefined>;
  findByDocumentNumber({
    client_application_id,
    document_number,
  }: IFindByDocumentNumber): Promise<FinancialMovimentPayment | undefined>;
  create(
    financialMovimentPayment: ICreateFinancialMovimentPaymentDTO,
  ): Promise<FinancialMovimentPayment>;
  save(
    financialMovimentPayment: FinancialMovimentPayment,
  ): Promise<FinancialMovimentPayment>;
}
