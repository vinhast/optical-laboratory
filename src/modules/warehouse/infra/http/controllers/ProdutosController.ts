import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetService from '@modules/warehouse/services/Produtos/GetService';

export default class ProdutosController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getProduct = container.resolve(GetService);
    const product = await getProduct.execute(Number(id));
    return response.json(classToClass(product));
  }
}
