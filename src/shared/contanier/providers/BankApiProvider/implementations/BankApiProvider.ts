import IPaymentModulesRepository from '@modules/financial/repositories/IPaymentModulesRepository';
import IBankApiProvider, {
  IBankApiResponse,
} from '@shared/contanier/providers/BankApiProvider/models/IBankApiProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class BankApiProvider implements IBankApiProvider {
  constructor(
    @inject('InterApiProvider')
    private interApiProvider: IBankApiProvider,
    @inject('PaymentModulesRepository')
    private paymentModulesRepository: IPaymentModulesRepository,
  ) {}
  public async getBankModule(
    id: number,
  ): Promise<IBankApiResponse | undefined> {
    const banksModules: any = {
      inter: this.interApiProvider,
    };
    const findPaymentModule = await this.paymentModulesRepository.findById(id);
    if (findPaymentModule) {
      return banksModules[findPaymentModule.module];
    }
    return undefined;
  }
}
