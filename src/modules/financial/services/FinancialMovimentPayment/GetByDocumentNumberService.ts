import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsPaymentsRepository from '@modules/financial/repositories/IFinancialMovimentsPaymentsRepository';
import FinancialMovimentPayment from '@modules/financial/infra/typeorm/entities/FinancialMovimentPayment';

interface IRequest {
  document_number: string;
  client_application_id: number;
}

@injectable()
class GetByDocumentNumberService {
  constructor(
    @inject('FinancialMovimentsPaymentsRepository')
    private financialMovimentsPaymentsRepository: IFinancialMovimentsPaymentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    client_application_id,
    document_number,
  }: IRequest): Promise<FinancialMovimentPayment | undefined> {
    const cacheKey = `financial-moviment-payment-get-${document_number}`;
    let financialMovimentPayment = await this.cacheProvider.recover<
      FinancialMovimentPayment | undefined
    >(cacheKey);

    if (!financialMovimentPayment) {
      financialMovimentPayment =
        await this.financialMovimentsPaymentsRepository.findByDocumentNumber({
          client_application_id,
          document_number,
        });
      this.cacheProvider.save(cacheKey, classToClass(financialMovimentPayment));
    }

    return financialMovimentPayment;
  }
}

export default GetByDocumentNumberService;
