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
    const { bankAccount } = request.body;
    const createBankAccount = container.resolve(CreateService);
    const bankAccountCreate = await createBankAccount.execute(bankAccount);

    return response.json(classToClass(bankAccountCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getBankAccount = container.resolve(GetService);
    const bankAccount = await getBankAccount.execute(Number(id));

    return response.json(classToClass(bankAccount));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { bankAccount } = request.body;
    const updateBankAccount = container.resolve(UpdateService);
    const bankAccountUpdate = await updateBankAccount.execute(bankAccount);

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
