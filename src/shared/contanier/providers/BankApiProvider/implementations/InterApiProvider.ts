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
          motivoCancelamento: cancellationReason,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.token,
          },
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
          ...createBankSlip,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.token,
          },
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
