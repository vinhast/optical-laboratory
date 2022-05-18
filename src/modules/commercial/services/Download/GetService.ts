import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IDownloadsRepository from '@modules/commercial/repositories/IDownloadsRepository';
import Download from '@modules/commercial/infra/typeorm/entities/Download';

@injectable()
class GetService {
  constructor(
    @inject('DownloadsRepository')
    private downloadsRepository: IDownloadsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: number): Promise<Download> {
    const cacheKey = `download-get-${id}`;
    let download = await this.cacheProvider.recover<Download | undefined>(
      cacheKey,
    );

    if (!download) {
      download = await this.downloadsRepository.findById(id);
      this.cacheProvider.save(cacheKey, classToClass(Download));
    }

    if (!download) {
      throw new AppError('Download not found.', 404);
    }

    return download;
  }
}

export default GetService;
