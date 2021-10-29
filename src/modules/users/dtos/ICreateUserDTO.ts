export default interface ICreateUserDTO {
  role_id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  active: boolean;
}
