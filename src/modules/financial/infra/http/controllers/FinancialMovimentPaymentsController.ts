import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetBankSlipPDFService from '@modules/financial/services/FinancialMovimentPayment/GetBankSlipPDFService';
import GetListBankSlipService from '@modules/financial/services/FinancialMovimentPayment/GetListBankSlipService';

export default class FinancialMovimentPaymentsController {
  public async getBankSlipPDF(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { financial_moviment_id } = request.params;
    const getBankSlipPDFFinancialMovimentPayment = container.resolve(
      GetBankSlipPDFService,
    );
    const id = Number(financial_moviment_id);
    const pdf = await getBankSlipPDFFinancialMovimentPayment.execute(id);
    return response.json({ pdf });
  }

  public async getListBankSlip(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { payment_gateway_id } = request.params;
    const getListBankSlipFinancialMovimentPayment = container.resolve(
      GetListBankSlipService,
    );
    const id = Number(payment_gateway_id);

    const listBankslip = await getListBankSlipFinancialMovimentPayment.execute(
      id,
    );
    return response.json({ listBankslip });
  }
}
