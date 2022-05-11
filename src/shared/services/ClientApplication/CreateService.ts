import { inject, injectable } from 'tsyringe';

import IClientApplicationsRepository from '@shared/repositories/IClientApplicationsRepository';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import ClientApplication from '@shared/infra/typeorm/entities/ClientApplication';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/moldes/IHashProvider';

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
    @inject('HashProvider')
    private hashProvider: IHashProvider,
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
    let clientApplication = await this.clientApplicationsRepository.findByEmail(
      email,
    );
    if (clientApplication) {
      throw new AppError('Email address already used.');
    }
    clientApplication = await this.clientApplicationsRepository.create({
      name,
      email,
      avatar,
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

    await this.cacheProvider.invalidatePrefix(`client-applications-list`);

    return clientApplication;
  }
}

export default CreateService;
