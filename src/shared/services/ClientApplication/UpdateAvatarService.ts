import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';
import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  client_application_id: number;
  avatarFilename: string;
}

@injectable()
class UpdateClientApplicationAvatarService {
  constructor(
    @inject('ClientApplicationsRepository')
    private clientApplicationsRepository: IClientApplicationsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async excute({
    client_application_id,
    avatarFilename,
  }: IRequest): Promise<ClientApplication> {
    const clientApplication = await this.clientApplicationsRepository.findById(
      client_application_id,
    );

    if (!clientApplication) {
      throw new AppError(
        'Only authenticated Client applications can change avatar',
        401,
      );
    }

    if (avatarFilename) {
      if (clientApplication.avatar) {
        await this.storageProvider.deleteFile(clientApplication.avatar);
      }

      const filename = await this.storageProvider.saveFile(avatarFilename);

      clientApplication.avatar = filename;

      await this.clientApplicationsRepository.save(clientApplication);
    }

    return clientApplication;
  }
}

export default UpdateClientApplicationAvatarService;
