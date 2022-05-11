import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ISalesTablesRepository from '@modules/users/repositories/ISalesTablesRepository';
import SaleTable from '@modules/users/infra/typeorm/entities/SaleTable';

@injectable()
class ListService {
  constructor(
    @inject('SalesTablesRepository')
    private salesTablesRepository: ISalesTablesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<SaleTable[]> {
    const cacheKey = `sales-tables-list`;
    let salesTables = await this.cacheProvider.recover<SaleTable[]>(cacheKey);

    if (!salesTables) {
      salesTables = await this.salesTablesRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(salesTables));
    }

    return salesTables;
  }
}

export default ListService;
