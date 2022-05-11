import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/BankAccount/ListService';
import CreateService from '@modules/financial/services/BankAccount/CreateService';
import UpdateService from '@modules/financial/services/BankAccount/UpdateService';
import GetService from '@modules/financial/services/BankAccount/GetService';
import DeleteService from '@modules/financial/services/BankAccount/DeleteService';

export default class BankAccountsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listBankAccoounts = container.resolve(ListService);
    const bankAccounts = await listBankAccoounts.execute();

    return response.json(classToClass(bankAccounts));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      registry,
      agency,
      account,
      account_dv,
      client_code,
      assignor_code,
      assignor_code_dv,
      document,
      transmission_code,
      currency,
      invoice_value,
      delay_fines,
      delay_taxes,
      message_1,
      message_2,
      message_3,
      instruction_1,
      instruction_2,
      instruction_3,
      user_id,
      username,
      active,
    } = request.body;
    const createBankAccount = container.resolve(CreateService);
    const bankAccountCreate = await createBankAccount.execute({
      name,
      registry,
      agency,
      account,
      account_dv,
      client_code,
      assignor_code,
      assignor_code_dv,
      document,
      transmission_code,
      currency,
      invoice_value,
      delay_fines,
      delay_taxes,
      message_1,
      message_2,
      message_3,
      instruction_1,
      instruction_2,
      instruction_3,
      user_id,
      username,
      active,
    });

    return response.json(classToClass(bankAccountCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getBankAccount = container.resolve(GetService);
    const bankAccount = await getBankAccount.execute(Number(id));

    return response.json(classToClass(bankAccount));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      registry,
      agency,
      account,
      account_dv,
      client_code,
      assignor_code,
      assignor_code_dv,
      document,
      transmission_code,
      currency,
      invoice_value,
      delay_fines,
      delay_taxes,
      message_1,
      message_2,
      message_3,
      instruction_1,
      instruction_2,
      instruction_3,
      user_id,
      username,
      active,
    } = request.body;
    const updateBankAccount = container.resolve(UpdateService);
    const bankAccountUpdate = await updateBankAccount.execute({
      id: Number(id),
      name,
      registry,
      agency,
      account,
      account_dv,
      client_code,
      assignor_code,
      assignor_code_dv,
      document,
      transmission_code,
      currency,
      invoice_value,
      delay_fines,
      delay_taxes,
      message_1,
      message_2,
      message_3,
      instruction_1,
      instruction_2,
      instruction_3,
      user_id,
      username,
      active,
    });

    return response.json(classToClass(bankAccountUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteBankAccount = container.resolve(DeleteService);
    await deleteBankAccount.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'bankAccount removed' });
  }
}
