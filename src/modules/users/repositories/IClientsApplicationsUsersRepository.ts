import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';
import ICreateClientApplicationUserDTO from '@modules/users/dtos/ICreateClientApplicationUserDTO';

export default interface IClientsApplicationsUsersRepository {
  findAll(): Promise<ClientApplicationUser[]>;
  findByClientApplication(
    client_application_id: number,
  ): Promise<ClientApplicationUser[]>;
  findById(
    id: number,
    client_application_id?: number,
  ): Promise<ClientApplicationUser | undefined>;
  findByUsername(
    username: string,
    client_application_id?: number,
  ): Promise<ClientApplicationUser | undefined>;
  findByToken(token: string): Promise<ClientApplicationUser | undefined>;
  create(data: ICreateClientApplicationUserDTO): Promise<ClientApplicationUser>;
  save(
    clientApplicationUser: ClientApplicationUser,
  ): Promise<ClientApplicationUser>;
  delete(id: number, client_application_id: number): Promise<void>;
}
