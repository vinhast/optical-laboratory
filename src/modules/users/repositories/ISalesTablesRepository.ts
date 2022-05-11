import SaleTable from '@modules/users/infra/typeorm/entities/SaleTable';
import ICreateSaleTableDTO from '@modules/users/dtos/ICreateSaleTableDTO';

export default interface ISalesTablesRepository {
  findAll(): Promise<SaleTable[]>;
  findById(id: number): Promise<SaleTable | undefined>;
  create(data: ICreateSaleTableDTO): Promise<SaleTable>;
  save(role: SaleTable): Promise<SaleTable>;
  delete(id: number): Promise<void>;
}
