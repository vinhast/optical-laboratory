interface ICredentials {
  grant_type?: string;
  client_id: number;
  client_secret: string;
  certificate_file: string;
  key_file: string;
  scope?: string;
}
interface IResponseToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export default interface IInterApiProvider {
  getToken(credentials: ICredentials): Promise<IResponseToken>;
}
