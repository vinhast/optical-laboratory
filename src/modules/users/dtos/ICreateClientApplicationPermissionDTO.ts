export default interface ICreateClientApplicationPermissionDTO {
  name: string;
  description: string;
  method: string;
  base_url: string;
  path: string | undefined;
}
