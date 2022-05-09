import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/Credit/ListService';
import CreateService from '@modules/financial/services/Credit/CreateService';
import UpdateService from '@modules/financial/services/Credit/UpdateService';
import GetService from '@modules/financial/services/Credit/GetService';
import DeleteService from '@modules/financial/services/Credit/DeleteService';

export default class CreditsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCredits = container.resolve(ListService);
    const credits = await listCredits.execute();

    return response.json(classToClass(credits));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { credit } = request.body;
    const createCredit = container.resolve(CreateService);
    const creditCreate = await createCredit.execute(credit);

    return response.json(classToClass(creditCreate));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getCredit = container.resolve(GetService);
    const credit = await getCredit.execute(Number(id));

    return response.json(classToClass(credit));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { credit } = request.body;
    const updateCredit = container.resolve(UpdateService);
    const creditUpdate = await updateCredit.execute(credit);

    return response.json(classToClass(creditUpdate));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCredit = container.resolve(DeleteService);
    await deleteCredit.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'credit removed' });
  }
}
