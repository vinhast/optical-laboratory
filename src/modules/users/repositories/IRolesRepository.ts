import Role from '@modules/users/infra/typeorm/entities/Role';
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

export default interface IRolesRepository {
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
  save(role: Role): Promise<Role>;
  delete(id: number): Promise<void>;
}
