export interface ICredentials {
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

export interface IBankApiResponse {
  getToken(credentials: ICredentials): Promise<IResponseToken>;
}
export default interface IBankApiProvider {
  getBankModule(id: number): Promise<IBankApiResponse | undefined>;
}
