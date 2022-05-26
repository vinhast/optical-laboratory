import { getRepository, Repository } from 'typeorm';

import ISalesTablesPricesServicesRepository from '@modules/users/repositories/ISalesTablesPricesServicesRepository';
import ICreateSaleTablePriceServiceDTO from '@modules/users/dtos/ICreateSaleTablePriceServiceDTO';

import SaleTablePriceService from '@modules/users/infra/typeorm/entities/SaleTablePriceService';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';

class SaleTablePriceServicesRepository
  extends MainRepository
  implements ISalesTablesPricesServicesRepository
{
  private ormRepository: Repository<SaleTablePriceService>;

  constructor() {
    const repository = getRepository(SaleTablePriceService);
    super(repository);
    this.ormRepository = repository;
  }

  public async create(
    saleTableData: ICreateSaleTablePriceServiceDTO,
  ): Promise<SaleTablePriceService> {
    const saleTable = this.ormRepository.create(saleTableData);

    await this.ormRepository.save(saleTable);

    return saleTable;
  }

  public save(
    saleTable: SaleTablePriceService,
  ): Promise<SaleTablePriceService> {
    return this.ormRepository.save(saleTable);
  }
}

export default SaleTablePriceServicesRepository;
