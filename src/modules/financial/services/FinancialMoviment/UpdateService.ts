import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import ICreateFinancialMovimentDTO from '@modules/financial/dtos/ICreateFinancialMovimentDTO';

interface IRequest extends ICreateFinancialMovimentDTO {
  id: number;
}

@injectable()
class UpdateService {
  constructor(
    @inject('FinancialMovimentsRepository')
    private financialMovimentsRepository: IFinancialMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    financialMovimentUpdate: IRequest,
  ): Promise<FinancialMoviment> {
    const id = financialMovimentUpdate.id;
    const cacheKey = `financial-moviment-get-${id}`;
    let financialMoviment = await this.cacheProvider.recover<
      FinancialMoviment | undefined
    >(cacheKey);

    if (!financialMoviment) {
      financialMoviment = await this.financialMovimentsRepository.findById(id);
    }

    if (!financialMoviment) {
      throw new AppError('FinancialMoviment not found.', 404);
    }

    financialMoviment = {
      ...financialMoviment,
      ...financialMovimentUpdate,
    };

    await this.cacheProvider.invalidate(`financial-moviments-list`);
    await this.cacheProvider.invalidate(cacheKey);

    await this.financialMovimentsRepository.save(financialMoviment);

    return financialMoviment;
  }
}

export default UpdateService;
