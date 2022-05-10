import Produtos from '@modules/warehouse/infra/typeorm/entities/Produtos';

export default interface IProdutosRepository {
  findById(id: number): Promise<Produtos | undefined>;
}
