import Provider from '@modules/commercial/infra/typeorm/entities/Provider';
import ICreateProviderDTO from '../dtos/ICreateProviderDTO';

export default interface IProviderRsepository {
  findAll(): Promise<Provider[]>;
  findById(id: number): Promise<Provider | undefined>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  save(Provider: Provider): Promise<Provider>;
  delete(id: number): Promise<void>;
}
