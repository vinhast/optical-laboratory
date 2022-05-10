import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ICreditsRepository from '@modules/financial/repositories/ICreditsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('CreditsRepository')
    private creditsRepository: ICreditsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const client = await this.creditsRepository.findById(id);

    if (!client) {
      throw new AppError('credit not found.', 404);
    }

    await this.cacheProvider.invalidate(`credits-list`);
    await this.cacheProvider.invalidate(`credit-get-${id}`);

    await this.creditsRepository.delete(id);

    return true;
  }
}

export default DeleteService;
