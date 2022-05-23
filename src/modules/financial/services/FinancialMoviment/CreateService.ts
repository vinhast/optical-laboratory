/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/contanier/providers/CacheProvider/models/ICacheProvider';
import IFinancialMovimentsRepository from '@modules/financial/repositories/IFinancialMovimentsRepository';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import ICreateFinancialMovimentDTO from '@modules/financial/dtos/ICreateFinancialMovimentDTO';
import moment from 'moment';
import httpContext from 'express-http-context';

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
    if (request.finished === 'S') {
      const user = httpContext.get('user');
      request.downloaded_user_id = user?.client_application_id;
      request.downloaded_at = new Date(
        moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      );
    }
    let financialMoviment = await this.financialMovimentsRepository.create(
      request,
    );
    let due_date = moment(request.due_date).subtract(3, 'h').toDate();
    if (request.recurrence) {
      for (
        let index = 0;
        index < Number(request.number_recurrence) - 1;
        index += 1
      ) {
        due_date = moment(due_date)
          .add(recurrenceType[request.frequency])
          .toDate();
        financialMoviment = await this.financialMovimentsRepository.create({
          ...request,
          downloaded_at: new Date(moment().format('YYYY-MM-DDTHH:mm:ss[Z]')),
          due_date,
        });
      }
    }

    await this.cacheProvider.invalidate('financial-moviments-list');

    return financialMoviment;
  }
}

export default CreateService;
