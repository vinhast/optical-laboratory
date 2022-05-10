import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProvidersRepository from '@modules/commercial/repositories/IProvidersRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const provider = await this.providersRepository.findById(id);

    if (!provider) {
      throw new AppError('Provider not found.', 404);
    }

    await this.cacheProvider.invalidate(`providers-list`);

    await this.providersRepository.delete(id);

    return true;
  }
}

export default DeleteService;
