import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import SaleTable from '@modules/users/infra/typeorm/entities/SaleTable';
import ISalesTablesRepository from '@modules/users/repositories/ISalesTablesRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

@injectable()
class GetService {
  constructor(
    @inject('SalesTablesRepository')
    private salesTablesRepository: ISalesTablesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<SaleTable> {
    const cacheKey = `sale-table-get-${id}`;
    let saleTable = await this.cacheProvider.recover<SaleTable | undefined>(
      cacheKey,
    );

    if (!saleTable) {
      saleTable = await this.salesTablesRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(saleTable));
    }

    if (!saleTable) {
      throw new AppError('saleTable not found.', 404);
    }

    return saleTable;
  }
}

export default GetService;
