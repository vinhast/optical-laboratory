/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/newline-after-import
import IInterApiProvider from '@shared/contanier/providers/InterApiProvider/models/IInterApiProvider';
import axios from 'axios';
import https from 'https';
import AppError from '@shared/errors/AppError';

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

export default class InterApiProvider implements IInterApiProvider {
  public async getToken(credentials: ICredentials): Promise<IResponseToken> {
    const cert = credentials.certificate_file;
    const key = credentials.key_file;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert,
      key,
    });
    const instance = axios.create({ httpsAgent });
    let token;
    try {
      const response = await instance.post(
        'https://cdpj.partners.bancointer.com.br/oauth/v2/token',
        new URLSearchParams({
          ...JSON.parse(JSON.stringify(credentials)),
          grant_type: credentials.grant_type || 'client_credentials',
          scope:
            credentials.scope || 'boleto-cobranca.read boleto-cobranca.write',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        },
      );
      // const response = await instance.get(
      //   'https://cdpj.partners.bancointer.com.br/cobranca/v2/boletos/00814584233/pdf',
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: 'Bearer 9a2c7388-53e1-4a30-8ce9-5279b2022d6e',
      //     },
      //   },
      // );
      // const response = await instance.post(
      //   'https://cdpj.partners.bancointer.com.br/oauth/v2/token',
      //   new URLSearchParams({
      //     grant_type: 'client_credentials',
      //     client_id: '6bd380c3-7c5c-4e3b-8493-7875cef2dda8',
      //     client_secret: '20228739-7fe4-4914-b333-f843f2226b59',
      //     scope: 'boleto-cobranca.read boleto-cobranca.write',
      //   }),
      //   {
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //       Accept: 'application/json',
      //     },
      //   },
      // );
      // const response = await sdk.Token(
      //   {
      //     // ...credentials,
      //     grant_type: 'client_credentials',
      //     client_id: '6bd380c3-7c5c-4e3b-8493-7875cef2dda8',
      //     client_secret: '20228739-7fe4-4914-b333-f843f2226b59',
      //     scope: 'boleto-cobranca.read boleto-cobranca.write',
      //   },
      //   { Accept: 'application/json' },
      // );
      // sdk.auth('1a9ec106-ed01-44bb-92ce-35b030a6af6a');
      // const response = await sdk.descarregarPdfBoleto({
      //   nossoNumero: '00814584233',
      // });

      token = response.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        throw new AppError('Credetials incorrent', 401);
      }
    }
    return token;
  }
}
