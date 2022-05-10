import { getRepository, Repository } from 'typeorm';
import IProdutosRepository from '@modules/warehouse/repositories/IProdutosRepository';
import Produtos from '@modules/warehouse/infra/typeorm/entities/Produtos';

class ProdutosRepository implements IProdutosRepository {
  private ormRepository: Repository<Produtos>;

  constructor() {
    this.ormRepository = getRepository(Produtos);
  }

  public async findById(id: number): Promise<Produtos | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }
}

export default ProdutosRepository;
