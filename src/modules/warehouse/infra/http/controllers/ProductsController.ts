import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListService from '@modules/warehouse/services/Product/ListService';
import SearchService from '@modules/warehouse/services/Product/SearchService';
import CreateService from '@modules/warehouse/services/Product/CreateService';
import UpdateService from '@modules/warehouse/services/Product/UpdateService';
import GetService from '@modules/warehouse/services/Product/GetService';
import DeleteService from '@modules/warehouse/services/Product/DeleteService';

export default class ProductProductsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListService);
    const products = await listProducts.execute();

    return response.json(classToClass(products));
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { product, client_id } = request.query;
    const listProducts = container.resolve(SearchService);
    const products = await listProducts.execute(
      product ? JSON.parse(String(product)) : {},
      Number(client_id),
    );

    return response.json(classToClass(products));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      product_category_id,
      side,
      cylindrical,
      spherical,
      addition,
      price,
      bars_code,
      active,
    } = request.body;

    const createProduct = container.resolve(CreateService);
    const product = await createProduct.execute({
      product_category_id,
      side,
      cylindrical,
      spherical,
      addition,
      price,
      bars_code,
      active,
    });

    return response.json(classToClass(product));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getProduct = container.resolve(GetService);
    const product = await getProduct.execute(Number(id));
    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      product_category_id,
      side,
      cylindrical,
      spherical,
      addition,
      price,
      bars_code,
      active,
    } = request.body;
    const { id } = request.params;
    const updateProduct = container.resolve(UpdateService);

    const product = await updateProduct.execute({
      id: Number(id),
      product_category_id,
      side,
      cylindrical,
      spherical,
      addition,
      price,
      bars_code,
      active,
    });

    return response.json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = container.resolve(DeleteService);
    await deleteProduct.execute({
      id: Number(id),
    });

    return response.status(204).json({ message: 'Product removed' });
  }
}
