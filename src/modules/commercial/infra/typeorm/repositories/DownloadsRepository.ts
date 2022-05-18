import { getRepository, Repository } from 'typeorm';

import IDownloadsRepository from '@modules/commercial/repositories/IDownloadsRepository';
import Download from '@modules/commercial/infra/typeorm/entities/Download';
import ICreateDownloadDTO from '@modules/commercial/dtos/ICreateDownloadDTO';
import MainRepository from '@shared/infra/typeorm/repositories/MainRepository';
import httpContext from 'express-http-context';

class DownloadsRepository
  extends MainRepository
  implements IDownloadsRepository
{
  private ormRepository: Repository<Download>;
  private userData: {
    id: number;
    client_application_id: number;
    role_id: number;
  };

  constructor() {
    const repository = getRepository(Download);
    super(repository);
    this.ormRepository = repository;
    this.userData = httpContext.get('user');
  }

  public async findById(id: number): Promise<any | undefined> {
    const download = await this.ormRepository.findOne({
      where: {
        id,
        client_application_id: this.userData.client_application_id,
      },
    });
    return download;
  }

  public async create(downloadData: ICreateDownloadDTO): Promise<Download> {
    const download = this.ormRepository.create(downloadData);
    await this.ormRepository.save(download);
    return download;
  }

  public save(download: Download): Promise<Download> {
    return this.ormRepository.save(download);
  }
}

export default DownloadsRepository;
