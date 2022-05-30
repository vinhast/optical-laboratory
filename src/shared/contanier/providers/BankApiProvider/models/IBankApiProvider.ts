export interface ICredentials {
  grant_type?: string;
  client_id: number;
  client_secret: string;
  certificate_file: string;
  key_file: string;
  scope?: string;
  yourNumber?: string;
}

export interface IResponseToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface IBankSlipMessage {
  linha1: string;
  linha2: string;
  linha3: string;
  linha4: string;
  linha5: string;
}
interface IBankSlipDiscount {
  codigo: string;
  data: string;
  taxa: number;
  valor: number;
}
interface IPayer {
  cpfCnpj: string;
  tipoPessoa: 'FISICA' | 'JURIDICA';
  nome: string;
  endereco: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade: string;
  uf: string;
  cep: string;
  email?: string;
  ddd?: string;
  telefone?: string;
}

interface IBankSlip {
  nomeBeneficiario: string;
  cnpjCpfBeneficiario: string;
  tipoPessoaBeneficiario: string;
  contaCorrente: string;
  nossoNumero: string;
  seuNumero: string;
  pagador: IPayer;
  situacao: string;
  dataHoraSituacao: string;
  dataVencimento: string;
  valorNominal: number;
  valorTotalRecebimento: number;
  dataEmissao: string;
  dataLimite: string;
  codigoEspecie: string;
  codigoBarras: string;
  linhaDigitavel: string;
  origem: string;
  mensagem: IBankSlipMessage;
  desconto1: IBankSlipDiscount;
  desconto2: IBankSlipDiscount;
  desconto3: IBankSlipDiscount;
  multa: IBankSlipDiscount;
  mora: IBankSlipDiscount;
  valorAbatimento: number;
}

export interface IResponseListBankSlip {
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  numberOfElements: number;
  content: IBankSlip[];
}

export interface IParams {
  dataInicial: string;
  dataFinal: string;
  filtrarDataPor: string;
  itensPorPagina: string;
  paginaAtual: string;
  ordenarPor: string;
  tipoOrdenacao: string;
}

export interface ICancelBankSlipData {
  credentials: ICredentials;
  ourNumber: string;
  cancellationReason:
    | 'ACERTOS'
    | 'APEDIDODOCLIENTE'
    | 'DEVOLUCAO'
    | 'PAGODIRETOAOCLIENTE'
    | 'SUBSTITUICAO';
}
export interface ICreateBankSlipData {
  seuNumero: string;
  valorNominal: number;
  valorAbatimento?: number;
  dataVencimento: string;
  numDiasAgenda: number;
  pagador: IPayer;
  mensagem?: IBankSlipMessage;
  desconto1?: IBankSlipDiscount;
  desconto2?: IBankSlipDiscount;
  desconto3?: IBankSlipDiscount;
  multa?: IBankSlipDiscount;
  mora?: IBankSlipDiscount;
}
export interface IResponseCreateBankSlip {
  seuNumero: string;
  nossoNumero: string;
  codigoBarras: string;
  linhaDigitavel: string;
}

export interface IBankApiResponse {
  getToken(credentials: ICredentials): Promise<IResponseToken>;
  getBankSlipPDF(credentials: ICredentials, ourNumber: string): Promise<string>;
  getListBankSlip(
    credentials: ICredentials,
    params?: IParams,
  ): Promise<IResponseListBankSlip>;
  cancelBankSlip({
    cancellationReason,
    credentials,
    ourNumber,
  }: ICancelBankSlipData): Promise<boolean>;
  createBankSlip(
    credentials: ICredentials,
    createBankSlip: ICreateBankSlipData,
  ): Promise<IResponseCreateBankSlip>;
}
export default interface IBankApiProvider {
  getBankModule(id: number): Promise<IBankApiResponse | undefined>;
}
