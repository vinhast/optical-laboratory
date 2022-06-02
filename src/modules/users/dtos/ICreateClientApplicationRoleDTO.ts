import ClientApplicationPermission from '../infra/typeorm/entities/ClientApplicationPermission';

export default interface ICreateClientApplicationRoleDTO {
  name: string;
  description: string;
  clientApplicationPermissions?: ClientApplicationPermission[];
}
