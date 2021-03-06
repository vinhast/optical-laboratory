export default interface ICreateClientApplicationUserDTO {
  client_application_role_id?: number;
  client_application_id: number;
  email: string;
  username: string;
  password: string;
  active?: boolean;
  token?: string;
  token_validate?: Date;
}
