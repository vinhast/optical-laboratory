import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IDownloadsRepository from '@modules/commercial/repositories/IDownloadsRepository';
import Download from '@modules/commercial/infra/typeorm/entities/Download';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  title: string;
  description: string;
  dir?: number;
  attachment?: string;
  user_id?: number;
}

@injectable()
class CreateService {
  constructor(
    @inject('DownloadsRepository')
    private downloadsRepository: IDownloadsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    description,
    title,
    attachment,
    dir,
    user_id,
  }: IRequest): Promise<Download> {
    let filename;
    if (attachment) {
      filename = await this.storageProvider.saveFile(attachment);
    }
    const download = await this.downloadsRepository.create({
      description,
      title,
      attachment: filename,
      dir,
      user_id,
    });

    await this.cacheProvider.invalidate(`downloads-list`);

    return download;
  }
}

export default CreateService;
