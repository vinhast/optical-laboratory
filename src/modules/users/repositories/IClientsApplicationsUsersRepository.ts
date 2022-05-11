import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';
import ICreateClientApplicationUserDTO from '@modules/users/dtos/ICreateClientApplicationUserDTO';

export default interface IClientsApplicationsUsersRepository {
  findAll(): Promise<ClientApplicationUser[]>;
  findById(id: number): Promise<ClientApplicationUser | undefined>;
  findByEmail(email: string): Promise<ClientApplicationUser | undefined>;
  findByUsername(username: string): Promise<ClientApplicationUser | undefined>;
  create(data: ICreateClientApplicationUserDTO): Promise<ClientApplicationUser>;
  save(
    clientApplicationUser: ClientApplicationUser,
  ): Promise<ClientApplicationUser>;
  delete(id: number): Promise<void>;
}
