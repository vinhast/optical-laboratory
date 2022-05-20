import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/financial/services/FinancialCategory/ListService';
import ListCategoriesAndSubCategoriesService from '@modules/financial/services/FinancialCategory/ListCategoriesAndSubCategoriesService';
import CreateService from '@modules/financial/services/FinancialCategory/CreateService';
import UpdateService from '@modules/financial/services/FinancialCategory/UpdateService';
import GetService from '@modules/financial/services/FinancialCategory/GetService';
import DeleteService from '@modules/financial/services/FinancialCategory/DeleteService';

export default class FinancialCategoriesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListService);
    const categories = await listCategories.execute();

    return response.json(classToClass(categories));
  }
  public async listCategoriesAndSubCategories(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const ListCategoriesAndSubCategories = container.resolve(
      ListCategoriesAndSubCategoriesService,
    );
    const categories = await ListCategoriesAndSubCategories.execute();

    return response.json(classToClass(categories));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { parent_id, name, type } = request.body;
    const createCategory = container.resolve(CreateService);
    const category = await createCategory.execute({
      parent_id,
      name,
      type,
    });

    return response.json(classToClass(category));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getCategory = container.resolve(GetService);
    const category = await getCategory.execute(Number(id));

    return response.json(classToClass(category));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { parent_id, name, type } = request.body;
    const updateCategory = container.resolve(UpdateService);
    const category = await updateCategory.execute({
      id: Number(id),
      parent_id,
      name,
      type,
    });

    return response.json(classToClass(category));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCategory = container.resolve(DeleteService);
    await deleteCategory.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'category removed' });
  }
}
