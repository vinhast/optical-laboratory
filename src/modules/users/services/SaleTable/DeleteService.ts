import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ISalesTablesRepository from '@modules/users/repositories/ISalesTablesRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('SalesTablesRepository')
    private salesTablesRepository: ISalesTablesRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const saleTable = await this.salesTablesRepository.findById(id);

    if (!saleTable) {
      throw new AppError('saleTable not found.', 404);
    }

    await this.cacheProvider.invalidate(`sales-tables-list`);
    await this.cacheProvider.invalidate(`sale-table-${id}`);

    await this.salesTablesRepository.delete(id);

    return true;
  }
}

export default DeleteService;
