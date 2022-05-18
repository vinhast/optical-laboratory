import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IDownloadsRepository from '@modules/commercial/repositories/IDownloadsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteService {
  constructor(
    @inject('DownloadsRepository')
    private downloadsRepository: IDownloadsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const download = await this.downloadsRepository.findById(id);

    if (!download) {
      throw new AppError('Download not found.', 404);
    }

    await this.cacheProvider.invalidate(`downloads-list`);
    await this.cacheProvider.invalidate(`download-get-${id}`);

    await this.downloadsRepository.delete(id);

    return true;
  }
}

export default DeleteService;
