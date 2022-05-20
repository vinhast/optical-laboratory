/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import ICreateFinancialMovimentDTO from '@modules/financial/dtos/ICreateFinancialMovimentDTO';
import moment from 'moment';

interface IRequest extends ICreateFinancialMovimentDTO {
  recurrence: boolean;
  frequency: string;
  number_recurrence: string;
}

@injectable()
class CreateService {
  constructor(
    @inject('FinancialMovimentsRepository')
    private financialMovimentsRepository: IFinancialMovimentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(request: IRequest): Promise<FinancialMoviment> {
    const recurrenceType: any = {
      q: { days: 15 },
      m: { month: 1 },
      s: { weeks: 1 },
    };
    let financialMoviment = await this.financialMovimentsRepository.create(
      request,
    );
    let due_date = request.due_date;
    if (request.recurrence) {
      for (
        let index = 0;
        index < Number(request.number_recurrence) - 1;
        index += 1
      ) {
        due_date = new Date(
          moment(due_date).add(recurrenceType[request.frequency]).toISOString(),
        );
        financialMoviment = await this.financialMovimentsRepository.create({
          ...request,
          due_date,
        });
      }
    }

    await this.cacheProvider.invalidate('financial-moviments-list');

    return financialMoviment;
  }
}

export default CreateService;
