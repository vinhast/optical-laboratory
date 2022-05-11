import { getRepository, Repository } from 'typeorm';

import ISalesTablesPricesRepository from '@modules/users/repositories/ISalesTablesPricesRepository';
import ICreateSaleTablePriceDTO from '@modules/users/dtos/ICreateSaleTablePriceDTO';

import SaleTablePrice from '@modules/users/infra/typeorm/entities/SaleTablePrice';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class SaleTablePricesRepository
  extends MainRepository
  implements ISalesTablesPricesRepository
{
  private ormRepository: Repository<SaleTablePrice>;

  constructor() {
    const repository = getRepository(SaleTablePrice);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    saleTableData: ICreateSaleTablePriceDTO,
  ): Promise<SaleTablePrice> {
    const saleTable = this.ormRepository.create(saleTableData);

    await this.ormRepository.save(saleTable);

    return saleTable;
  }

  public save(saleTable: SaleTablePrice): Promise<SaleTablePrice> {
    return this.ormRepository.save(saleTable);
  }
}

export default SaleTablePricesRepository;
