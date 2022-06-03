import ICreateClientApplicationRoleDTO from '../dtos/ICreateClientApplicationRoleDTO';
import ClientApplicationRole from '../infra/typeorm/entities/ClientApplicationRole';

export default interface IClientsApplicationRolesRepository {
  findAll(): Promise<ClientApplicationRole[]>;
  findByClientApplication(
    client_application_id: number,
  ): Promise<ClientApplicationRole[]>;
  findById(
    id: number,
    client_application_id?: number,
  ): Promise<ClientApplicationRole | undefined>;
  findByName(name: string): Promise<ClientApplicationRole | undefined>;
  create(data: ICreateClientApplicationRoleDTO): Promise<ClientApplicationRole>;
  save(
    clientApplicationRole: ClientApplicationRole,
  ): Promise<ClientApplicationRole>;
  delete(id: number): Promise<void>;
}
