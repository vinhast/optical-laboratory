import ICreateDownloadDTO from '../dtos/ICreateDownloadDTO';
import Download from '../infra/typeorm/entities/Download';

export default interface IDownloadsRepository {
  findAll(): Promise<Download[]>;
  findById(id: number): Promise<Download | undefined>;
  create(Download: ICreateDownloadDTO): Promise<Download>;
  save(Download: Download): Promise<Download>;
  delete(id: number): Promise<void>;
}
