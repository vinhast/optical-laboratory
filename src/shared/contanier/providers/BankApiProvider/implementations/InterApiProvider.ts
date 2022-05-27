/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/newline-after-import
import axios from 'axios';
import https from 'https';
import AppError from '@shared/errors/AppError';
import {
  IBankApiResponse,
  ICancelBankSlipData,
  ICreateBankSlipData,
  ICredentials,
  IParams,
  IResponseCreateBankSlip,
  IResponseListBankSlip,
  IResponseToken,
} from '../models/IBankApiProvider';

export default class InterApiProvider implements IBankApiResponse {
  private token: string;

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
      this.token = `Bearer ${token.access_token}`;
    } catch (error: any) {
      if (error.response.status === 401) {
        throw new AppError('Credetials incorrent', 401);
      }
    }
    return token;
  }
  public async getBankSlipPDF(
    credentials: ICredentials,
    ourNumber: string,
  ): Promise<string> {
    const token = await this.getToken(credentials);
    if (!token) {
      throw new AppError('Credentials not valid', 401);
    }
    const cert = credentials.certificate_file;
    const key = credentials.key_file;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert,
      key,
    });
    const instance = axios.create({ httpsAgent });
    try {
      const response = await instance.get(
        `https://cdpj.partners.bancointer.com.br/cobranca/v2/boletos/${ourNumber}/pdf`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.token,
          },
        },
      );
      return response.data.pdf;
    } catch (error: any) {
      throw new AppError(
        'An error occurred while trying to retrieve the bank slip',
        error.response.status,
      );
    }
  }
  public async getListBankSlip(
    credentials: ICredentials,
    params?: IParams,
  ): Promise<IResponseListBankSlip> {
    const token = await this.getToken(credentials);
    if (!token) {
      throw new AppError('Credentials not valid', 401);
    }
    const cert = credentials.certificate_file;
    const key = credentials.key_file;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert,
      key,
    });
    const instance = axios.create({ httpsAgent });
    try {
      const response = await instance.get(
        `https://cdpj.partners.bancointer.com.br/cobranca/v2/boletos`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: this.token,
          },
          params: {
            ...params,
            dataInicial: '2022-01-01',
            dataFinal: '2022-05-01',
            filtrarDataPor: 'VENCIMENTO',
            itensPorPagina: '100',
            paginaAtual: '0',
            ordenarPor: 'PAGADOR',
            tipoOrdenacao: 'ASC',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw new AppError(
        'An error occurred while trying to retrieve the list of bank slip',
        error.response.status,
      );
    }
  }
  public async cancelBankSlip({
    credentials,
    cancellationReason,
    ourNumber,
  }: ICancelBankSlipData): Promise<boolean> {
    const token = await this.getToken(credentials);
    if (!token) {
      throw new AppError('Credentials not valid', 401);
    }
    const cert = credentials.certificate_file;
    const key = credentials.key_file;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert,
      key,
    });
    const instance = axios.create({ httpsAgent });
    try {
      await instance.post(
        `
        https://cdpj.partners.bancointer.com.br/cobranca/v2/boletos/${ourNumber}/cancelar`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.token,
          },
          motivoCancelamento: cancellationReason,
        },
      );
      return true;
    } catch (error: any) {
      throw new AppError(
        'An error occurred while trying to cancel the bank slip',
        error.response.status,
      );
    }
  }
  public async createBankSlip(
    credentials: ICredentials,
    createBankSlip: ICreateBankSlipData,
  ): Promise<IResponseCreateBankSlip> {
    const token = await this.getToken(credentials);
    if (!token) {
      throw new AppError('Credentials not valid', 401);
    }
    const cert = credentials.certificate_file;
    const key = credentials.key_file;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert,
      key,
    });
    const instance = axios.create({ httpsAgent });
    try {
      const response = await instance.post(
        `https://cdpj.partners.bancointer.com.br/cobranca/v2/boletos`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.token,
          },
          ...createBankSlip,
        },
      );
      return response.data;
    } catch (error: any) {
      throw new AppError(
        'An error occurred while trying to create the bank slip',
        error.response.status,
      );
    }
  }
}
