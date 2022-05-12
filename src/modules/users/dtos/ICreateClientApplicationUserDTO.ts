export default interface ICreateClientApplicationUserDTO {
  role_id?: number;
  client_application_id: number;
  username: string;
  password: string;
  active: boolean;
  token?: string;
  token_validate?: Date;
}
