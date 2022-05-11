export default interface ICreateClientApplicationUserDTO {
  role_id?: number;
  client_application_id: number;
  username: string;
  password: string;
  active: boolean;
  user_token?: string;
  user_token_validate?: number;
}
