import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IDownloadsRepository from '@modules/commercial/repositories/IDownloadsRepository';
import Download from '@modules/commercial/infra/typeorm/entities/Download';

@injectable()
class ListService {
  constructor(
    @inject('DownloadsRepository')
    private downloadsRepository: IDownloadsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Download[]> {
    const cacheKey = `Downloads-list`;
    let downloads = await this.cacheProvider.recover<Download[]>(cacheKey);

    if (!downloads) {
      downloads = await this.downloadsRepository.findAll();
      await this.cacheProvider.save(cacheKey, classToClass(downloads));
    }

    return downloads;
  }
}

export default ListService;
