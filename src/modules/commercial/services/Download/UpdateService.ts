import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IDownloadsRepository from '@modules/commercial/repositories/IDownloadsRepository';
import Download from '@modules/commercial/infra/typeorm/entities/Download';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  id: number;
  title: string;
  description: string;
  dir?: number;
  attachment?: string;
  active: number;
  user_id?: number;
  deleteFile: boolean;
}

@injectable()
class UpdateService {
  constructor(
    @inject('DownloadsRepository')
    private downloadsRepository: IDownloadsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(downloadUpdate: IRequest): Promise<Download> {
    const id = downloadUpdate.id;
    const cacheKey = `download-get-${id}`;
    let download = await this.cacheProvider.recover<Download | undefined>(
      cacheKey,
    );

    if (!download) {
      download = await this.downloadsRepository.findById(id);
    }

    if (!download) {
      throw new AppError('Download not found.', 404);
    }
    download = {
      ...download,
      ...downloadUpdate,
      getattachment_url: download.getattachment_url,
      active: !!downloadUpdate.active,
    };

    let filename;
    if (downloadUpdate.attachment) {
      filename = await this.storageProvider.saveFile(downloadUpdate.attachment);
      download = {
        ...download,
        attachment: filename,
        getattachment_url: download.getattachment_url,
      };
    }
    if (downloadUpdate.deleteFile) {
      const findDownload = await this.downloadsRepository.findById(id);
      if (findDownload?.attachment) {
        await this.storageProvider.deleteFile(findDownload.attachment);
        download.attachment = '';
      }
    }

    await this.cacheProvider.invalidate(`download-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.downloadsRepository.save(download);

    return download;
  }
}

export default UpdateService;
