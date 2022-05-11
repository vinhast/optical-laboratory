import { inject, injectable } from 'tsyringe';

import SaleTable from '@modules/users/infra/typeorm/entities/SaleTable';
import ISalesTablesRepository from '@modules/users/repositories/ISalesTablesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ICreateSaleTableDTO from '@modules/users/dtos/ICreateSaleTableDTO';

@injectable()
class CreateService {
  constructor(
    @inject('SalesTablesRepository')
    private salesTablesRepository: ISalesTablesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(request: ICreateSaleTableDTO): Promise<SaleTable> {
    const saleTable = await this.salesTablesRepository.create(request);

    await this.cacheProvider.invalidate('sales-tables-list');

    return saleTable;
  }
}

export default CreateService;
