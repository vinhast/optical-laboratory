import { getRepository, Repository } from 'typeorm';

import ISalesTablesRepository from '@modules/users/repositories/ISalesTablesRepository';
import ICreateSaleTableDTO from '@modules/users/dtos/ICreateSaleTableDTO';

import SaleTable from '@modules/users/infra/typeorm/entities/SaleTable';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class SaleTablesRepository
  extends MainRepository
  implements ISalesTablesRepository
{
  private ormRepository: Repository<SaleTable>;

  constructor() {
    const repository = getRepository(SaleTable);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(saleTableData: ICreateSaleTableDTO): Promise<SaleTable> {
    const saleTable = this.ormRepository.create(saleTableData);

    await this.ormRepository.save(saleTable);

    return saleTable;
  }

  public save(saleTable: SaleTable): Promise<SaleTable> {
    return this.ormRepository.save(saleTable);
  }
}

export default SaleTablesRepository;
