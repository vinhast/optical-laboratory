import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Produtos from '@modules/warehouse/infra/typeorm/entities/Produtos';
import IProdutosRepository from '@modules/warehouse/repositories/IProdutosRepository';

@injectable()
class GetService {
  constructor(
    @inject('ProdutosRepository')
    private productsRepository: IProdutosRepository,
  ) {}

  public async execute(id: number): Promise<Produtos> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto not found.', 404);
    }

    return product;
  }
}

export default GetService;
