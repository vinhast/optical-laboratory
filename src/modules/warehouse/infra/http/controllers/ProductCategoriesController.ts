import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/warehouse/services/ProductCategory/ListService';
import CreateService from '@modules/warehouse/services/ProductCategory/CreateService';
import FindAllService from '@modules/warehouse/services/ProductCategory/FindAllService';
import ListGenerateRevenue from '@modules/warehouse/services/ProductCategory/ListGenerateRevenue';
import UpdateService from '@modules/warehouse/services/ProductCategory/UpdateService';
import GetService from '@modules/warehouse/services/ProductCategory/GetService';
import DeleteService from '@modules/warehouse/services/ProductCategory/DeleteService';

export default class ProductCategoriesController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllService = container.resolve(FindAllService);
    const listAllResult = await findAllService.execute();
    return response.json(classToClass(listAllResult));
  }

  public async listGenerateRevenue(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllService = container.resolve(ListGenerateRevenue);
    const listAllResult = await findAllService.execute();
    return response.json(classToClass(listAllResult));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListService);
    const { page, keyword, perPage, orderByField, orderBySort } = request.query;
    const categories = await listCategories.execute({
      page: Number(page),
      keyword: String(keyword),
      perPage: Number(perPage),
      orderByField: String(orderByField),
      orderBySort: String(orderBySort),
    });

    return response.json(classToClass(categories));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { parent_id, name, generate_revenue } = request.body;
    const createCategory = container.resolve(CreateService);
    const category = await createCategory.execute({
      parent_id,
      name,
      generate_revenue,
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
    const { parent_id, name, generate_revenue } = request.body;
    const updateCategory = container.resolve(UpdateService);
    const category = await updateCategory.execute({
      id: Number(id),
      parent_id,
      name,
      generate_revenue,
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
