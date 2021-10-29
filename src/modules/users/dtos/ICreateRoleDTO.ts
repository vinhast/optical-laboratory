import Permission from '@modules/users/infra/typeorm/entities/Permission';

export default interface ICreateRoleDTO {
  name: string;
  description: string;
  permissions?: Permission[];
}
