import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/FinancialMovimentPayment/ListService';
import CreateService from '@modules/financial/services/FinancialMovimentPayment/CreateService';
import UpdateService from '@modules/financial/services/FinancialMovimentPayment/UpdateService';
import GetService from '@modules/financial/services/FinancialMovimentPayment/GetService';
import DeleteService from '@modules/financial/services/FinancialMovimentPayment/DeleteService';
import GetBankSlipPDFService from '@modules/financial/services/FinancialMovimentPayment/GetBankSlipPDFService';
import GetListBankSlipService from '@modules/financial/services/FinancialMovimentPayment/GetListBankSlipService';
import CancelBankSlipService from '@modules/financial/services/FinancialMovimentPayment/CancelBankSlipService';
import CreateBankSlipService from '@modules/financial/services/FinancialMovimentPayment/CreateBankSlipService';

export default class FinancialMovimentPaymentsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listFinancialMovimentPayments = container.resolve(ListService);
    const financialMovimentPayments =
      await listFinancialMovimentPayments.execute();

    return response.json(classToClass(financialMovimentPayments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      financial_moviment_id,
      payment_method,
      payment_gateway_id,
      document_number,
      digitable_line,
      bar_code,
      situation,
      nsu_date,
      payment_date,
      due_date,
    } = request.body;
    const createFinancialMovimentPayment = container.resolve(CreateService);
    const FinancialMovimentPaymentCreate =
      await createFinancialMovimentPayment.execute({
        financial_moviment_id,
        payment_method,
        payment_gateway_id,
        document_number,
        digitable_line,
        bar_code,
        situation,
        nsu_date,
        payment_date,
        due_date,
      });

    return response.json(classToClass(FinancialMovimentPaymentCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getFinancialMovimentPayment = container.resolve(GetService);
    const financialMovimentPayment = await getFinancialMovimentPayment.execute(
      Number(id),
    );

    return response.json(classToClass(financialMovimentPayment));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      financial_moviment_id,
      payment_method,
      payment_gateway_id,
      document_number,
      digitable_line,
      bar_code,
      situation,
      nsu_date,
      payment_date,
      due_date,
    } = request.body;
    const updateFinancialMovimentPayment = container.resolve(UpdateService);
    const financialMovimentPaymentUpdate =
      await updateFinancialMovimentPayment.execute({
        id: Number(id),
        financial_moviment_id,
        payment_method,
        payment_gateway_id,
        document_number,
        digitable_line,
        bar_code,
        situation,
        nsu_date,
        payment_date,
        due_date,
      });

    return response.json(classToClass(financialMovimentPaymentUpdate));
  }

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

  public async cancelBankSlip(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { payment_gateway_id, ourNumber, cancellationReason } = request.body;
    const cancelBankSlipFinancialMovimentPayment = container.resolve(
      CancelBankSlipService,
    );
    const id = Number(payment_gateway_id);

    await cancelBankSlipFinancialMovimentPayment.execute({
      payment_gateway_id: id,
      ourNumber,
      cancellationReason,
    });
    return response.status(204).json({ message: 'Cancel bank slip' });
  }

  public async createBankSlip(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      payment_gateway_id,
      ourNumber,
      valorNominal,
      valorAbatimento,
      dataVencimento,
      numDiasAgenda,
      pagador,
      mensagem,
      desconto1,
      desconto2,
      desconto3,
      multa,
      mora,
    } = request.body;
    const createBankSlipFinancialMovimentPayment = container.resolve(
      CreateBankSlipService,
    );
    const id = Number(payment_gateway_id);

    const bankSlip = await createBankSlipFinancialMovimentPayment.execute({
      payment_gateway_id: id,
      bankSlip: {
        ourNumber,
        valorNominal,
        valorAbatimento,
        dataVencimento,
        numDiasAgenda,
        pagador,
        mensagem,
        desconto1,
        desconto2,
        desconto3,
        multa,
        mora,
      },
    });
    return response.json({ bankSlip });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteFinancialMovimentPayment = container.resolve(DeleteService);
    await deleteFinancialMovimentPayment.execute({
      id: Number(id),
    });

    return response
      .status(204)
      .json({ message: 'FinancialMovimentPayment removed' });
  }
}
