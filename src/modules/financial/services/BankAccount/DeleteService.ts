import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IBankAccountsRepository from '@modules/financial/repositories/IBankAccountsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const client = await this.bankAccountsRepository.findById(id);

    if (!client) {
      throw new AppError('bankAccount not found.', 404);
    }

    await this.cacheProvider.invalidate(`bankAccounts-list`);
    await this.cacheProvider.invalidate(`bankAccount-get-${id}`);

    await this.bankAccountsRepository.delete(id);

    return true;
  }
}

export default DeleteService;
