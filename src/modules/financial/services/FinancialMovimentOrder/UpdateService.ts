import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsOrdersRepository from '@modules/financial/repositories/IFinancialMovimentsOrdersRepository';
import FinancialMovimentOrder from '@modules/financial/infra/typeorm/entities/FinancialMovimentOrder';
import ICreateFinancialMovimentOrderDTO from '@modules/financial/dtos/ICreateFinancialMovimentOrderDTO';

interface IRequest extends ICreateFinancialMovimentOrderDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('FinancialMovimentsOrdersRepository')
    private financialMovimentsOrdersRepository: IFinancialMovimentsOrdersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    financialMovimentOrderUpdate: IRequest,
  ): Promise<FinancialMovimentOrder> {
    const id = financialMovimentOrderUpdate.id;
    const cacheKey = `financial-moviment-order-get-${id}`;
    let financialMovimentOrder = await this.cacheProvider.recover<
      FinancialMovimentOrder | undefined
    >(cacheKey);

    if (!financialMovimentOrder) {
      financialMovimentOrder =
        await this.financialMovimentsOrdersRepository.findById(id);
    }

    if (!financialMovimentOrder) {
      throw new AppError('FinancialMovimentOrder not found.', 404);
    }

    financialMovimentOrder = {
      ...financialMovimentOrder,
      ...financialMovimentOrderUpdate,
    };

    await this.cacheProvider.invalidate(`financial-moviments-orders-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.financialMovimentsOrdersRepository.save(financialMovimentOrder);

    return financialMovimentOrder;
  }
}

export default UpdateService;
