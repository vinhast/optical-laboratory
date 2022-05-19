import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/warehouse/services/ProductCategory/ListService';
import ListFamiliesService from '@modules/warehouse/services/ProductCategory/ListFamiliesService';
import CreateService from '@modules/warehouse/services/ProductCategory/CreateService';
import UpdateService from '@modules/warehouse/services/ProductCategory/UpdateService';
import GetService from '@modules/warehouse/services/ProductCategory/GetService';
import DeleteService from '@modules/warehouse/services/ProductCategory/DeleteService';

export default class ProductCategoriesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { parent_id } = request.query;
    const listProductCategories = container.resolve(ListService);
    let productCategories = await listProductCategories.execute();
    if (parent_id === 'null') {
      const listProductCategoriesFamilies =
        container.resolve(ListFamiliesService);
      productCategories = await listProductCategoriesFamilies.execute(
        parent_id,
      );
    }

    return response.json(classToClass(productCategories));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      parent_id,
      user_id,
      name,
      description,
      type,
      ncm,
      cst,
      cfop,
      unit_type_id,
      price,
      spherical_start,
      spherical_end,
      cylindrical_start,
      cylindrical_end,
      tables,
    } = request.body;
    const createCategory = container.resolve(CreateService);
    const category = await createCategory.execute({
      parent_id,
      user_id,
      name,
      description,
      type,
      ncm,
      cst,
      cfop,
      unit_type_id,
      price,
      spherical_start,
      spherical_end,
      cylindrical_start,
      cylindrical_end,
      tables,
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
    const {
      parent_id,
      user_id,
      name,
      description,
      type,
      ncm,
      cst,
      cfop,
      unit_type_id,
      price,
      spherical_start,
      spherical_end,
      cylindrical_start,
      cylindrical_end,
      tables,
    } = request.body;
    const updateCategory = container.resolve(UpdateService);
    const category = await updateCategory.execute({
      id: Number(id),
      parent_id,
      user_id,
      name,
      description,
      type,
      ncm,
      cst,
      cfop,
      unit_type_id,
      price,
      spherical_start,
      spherical_end,
      cylindrical_start,
      cylindrical_end,
      tables,
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
