import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/FinancialMoviment/ListService';
import CreateService from '@modules/financial/services/FinancialMoviment/CreateService';
import UpdateService from '@modules/financial/services/FinancialMoviment/UpdateService';
import GetService from '@modules/financial/services/FinancialMoviment/GetService';
import DeleteService from '@modules/financial/services/FinancialMoviment/DeleteService';

export default class FinancialMovimentsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listFinancialMoviments = container.resolve(ListService);
    const financialMoviments = await listFinancialMoviments.execute();

    return response.json(classToClass(financialMoviments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      client_id,
      provider_id,
      sub_category_id,
      category_id,
      bank_account_id,
      shipment_file_id,
      description,
      due_date,
      value,
      products_value,
      services_value,
      credits_value,
      fees_fines_value,
      nf_code,
      nf_receipt,
      nf_receipt_date,
      nf_issue_date,
      nf_cStat_receipt,
      nf_xmotivo_receipt,
      nf_number,
      nf_key,
      nf_protocoll,
      nf_protocoll_date,
      nf_protocoll_menssage,
      nf_year_month,
      nf_lot,
      nf_canceled,
      nf_canceled_protocoll,
      nf_canceled_date,
      nf_canceled_reason,
      nf_status,
      nfse_number,
      nfse_verification_code,
      nfse_issue_date,
      nfse_rps_number,
      nfse_canceled,
      nfse_status,
      finished,
      payment_method,
      invoice_status,
      invoice_registered,
      invoice_bank_downloaded,
      operation_type,
      generated_user_id,
      downloaded_user_id,
      downloaded_at,
      recurrence,
      frequency,
      number_recurrence,
    } = request.body;
    const createFinancialMoviment = container.resolve(CreateService);
    const financialMovimentCreate = await createFinancialMoviment.execute({
      client_id,
      provider_id,
      sub_category_id,
      category_id,
      bank_account_id,
      shipment_file_id,
      description,
      due_date,
      value,
      products_value,
      services_value,
      credits_value,
      fees_fines_value,
      nf_code,
      nf_receipt,
      nf_receipt_date,
      nf_issue_date,
      nf_cStat_receipt,
      nf_xmotivo_receipt,
      nf_number,
      nf_key,
      nf_protocoll,
      nf_protocoll_date,
      nf_protocoll_menssage,
      nf_year_month,
      nf_lot,
      nf_canceled,
      nf_canceled_protocoll,
      nf_canceled_date,
      nf_canceled_reason,
      nf_status,
      nfse_number,
      nfse_verification_code,
      nfse_issue_date,
      nfse_rps_number,
      nfse_canceled,
      nfse_status,
      finished,
      payment_method,
      invoice_status,
      invoice_registered,
      invoice_bank_downloaded,
      operation_type,
      generated_user_id,
      downloaded_user_id,
      downloaded_at,
      recurrence: !!recurrence,
      frequency,
      number_recurrence,
    });

    return response.json(classToClass(financialMovimentCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getFinancialMoviment = container.resolve(GetService);
    const financialMoviment = await getFinancialMoviment.execute(Number(id));

    return response.json(classToClass(financialMoviment));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      client_id,
      provider_id,
      sub_category_id,
      category_id,
      bank_account_id,
      shipment_file_id,
      description,
      due_date,
      value,
      products_value,
      services_value,
      credits_value,
      fees_fines_value,
      nf_code,
      nf_receipt,
      nf_receipt_date,
      nf_issue_date,
      nf_cStat_receipt,
      nf_xmotivo_receipt,
      nf_number,
      nf_key,
      nf_protocoll,
      nf_protocoll_date,
      nf_protocoll_menssage,
      nf_year_month,
      nf_lot,
      nf_canceled,
      nf_canceled_protocoll,
      nf_canceled_date,
      nf_canceled_reason,
      nf_status,
      nfse_number,
      nfse_verification_code,
      nfse_issue_date,
      nfse_rps_number,
      nfse_canceled,
      nfse_status,
      finished,
      payment_method,
      invoice_status,
      invoice_registered,
      invoice_bank_downloaded,
      operation_type,
      generated_user_id,
      downloaded_user_id,
      downloaded_at,
    } = request.body;
    const updateFinancialMoviment = container.resolve(UpdateService);
    const financialMovimentUpdate = await updateFinancialMoviment.execute({
      id: Number(id),
      client_id,
      provider_id,
      sub_category_id,
      category_id,
      bank_account_id,
      shipment_file_id,
      description,
      due_date,
      value,
      products_value,
      services_value,
      credits_value,
      fees_fines_value,
      nf_code,
      nf_receipt,
      nf_receipt_date,
      nf_issue_date,
      nf_cStat_receipt,
      nf_xmotivo_receipt,
      nf_number,
      nf_key,
      nf_protocoll,
      nf_protocoll_date,
      nf_protocoll_menssage,
      nf_year_month,
      nf_lot,
      nf_canceled,
      nf_canceled_protocoll,
      nf_canceled_date,
      nf_canceled_reason,
      nf_status,
      nfse_number,
      nfse_verification_code,
      nfse_issue_date,
      nfse_rps_number,
      nfse_canceled,
      nfse_status,
      finished,
      payment_method,
      invoice_status,
      invoice_registered,
      invoice_bank_downloaded,
      operation_type,
      generated_user_id,
      downloaded_user_id,
      downloaded_at,
    });

    return response.json(classToClass(financialMovimentUpdate));
  }

  public async updateAllFinancialMoviments(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { financialMoviments } = request.body;
    const updateFinancialMoviment = container.resolve(UpdateService);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-restricted-syntax
    for (const financialMoviment of financialMoviments) {
      if (financialMoviment) {
        // eslint-disable-next-line no-await-in-loop
        await updateFinancialMoviment.execute({
          ...financialMoviment,
          id: Number(financialMoviment.id),
          finished: 'S',
        });
      }
    }

    return response.json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteFinancialMoviment = container.resolve(DeleteService);
    await deleteFinancialMoviment.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'financialMoviment removed' });
  }
}
