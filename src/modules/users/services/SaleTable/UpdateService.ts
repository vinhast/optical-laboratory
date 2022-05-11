import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import SaleTable from '@modules/users/infra/typeorm/entities/SaleTable';
import ISalesTablesRepository from '@modules/users/repositories/ISalesTablesRepository';
import ICreateSaleTableDTO from '@modules/users/dtos/ICreateSaleTableDTO';

interface IRequest extends ICreateSaleTableDTO {
  id: number;
}
@injectable()
class UpdateService {
  constructor(
    @inject('SalesTablesRepository')
    private salesTablesRepository: ISalesTablesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(saleTableUpdate: IRequest): Promise<SaleTable> {
    const id = saleTableUpdate.id;
    const cacheKey = `sale-table-get-${id}`;
    let saleTable = await this.cacheProvider.recover<SaleTable | undefined>(
      cacheKey,
    );

    if (!saleTable) {
      saleTable = await this.salesTablesRepository.findById(id);
    }

    if (!saleTable) {
      throw new AppError('SaleTable not found.', 404);
    }

    saleTable = {
      ...saleTable,
      ...saleTableUpdate,
    };

    await this.cacheProvider.invalidate(`sales-tables-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.salesTablesRepository.save(saleTable);

    return saleTable;
  }
}

export default UpdateService;
