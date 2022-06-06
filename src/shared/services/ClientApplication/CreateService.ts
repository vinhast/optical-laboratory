import { inject, injectable } from 'tsyringe';

import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/contanier/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  name: string;
  email: string;
  avatar?: string;
  cnpj: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone?: string;
  mobile?: string;
}

@injectable()
class CreateService {
  constructor(
    @inject('ClientApplicationsRepository')
    private clientApplicationsRepository: IClientApplicationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    email,
    avatar,
    street,
    cnpj,
    number,
    complement,
    district,
    city,
    state,
    zip_code,
    phone,
    mobile,
  }: IRequest): Promise<ClientApplication> {
    let clientApplication = await this.clientApplicationsRepository.findByCnpj(
      cnpj,
    );
    if (clientApplication) {
      throw new AppError('Cnpj already used.');
    }
    let filename;
    if (avatar) {
      filename = await this.storageProvider.saveFile(avatar);
    }
    clientApplication = await this.clientApplicationsRepository.create({
      name,
      email,
      avatar: filename,
      cnpj,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      phone,
      mobile,
    });

    await this.cacheProvider.invalidate(`client-applications-list`, true);

    return clientApplication;
  }
}

export default CreateService;
