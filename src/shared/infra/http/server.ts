/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';
import { AsyncLocalStorage } from 'node:async_hooks';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimit from '@shared/infra/http/middlewares/rateLimiter';
import swaggerUI from 'swagger-ui-express';
import schedule from 'node-schedule';
import { container } from 'tsyringe';
import GetListBankSlipService from '@modules/financial/services/FinancialMovimentPayment/GetListBankSlipService';
import moment from 'moment';
import { createQueryBuilder, getRepository } from 'typeorm';
import FinancialMoviment from '@modules/financial/infra/typeorm/entities/FinancialMoviment';
import GetByDocumentNumberService from '@modules/financial/services/FinancialMovimentPayment/GetByDocumentNumberService';
import UpdateFinancialMovimentPaymentService from '@modules/financial/services/FinancialMovimentPayment/UpdateService';
import ICreateFinancialMovimentDTO from '@modules/financial/dtos/ICreateFinancialMovimentDTO';
import ClientApplicationUser from '@modules/users/infra/typeorm/entities/ClientApplicationUser';
import PaymentGateway from '@modules/financial/infra/typeorm/entities/PaymentGateway';
import routes from './routes';
import swaggerDocs from './swagger.json';

import '@shared/infra/typeorm';
import '@shared/contanier';

export const asyncLocalStorage = new AsyncLocalStorage();
const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimit);
app.use(httpContext.middleware);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

interface IFinancialMoviment extends ICreateFinancialMovimentDTO {
  id: number;
  created_at: Date;
  client_application_id: number;
  updated_at: Date;
  deleted_at?: Date;
  clientApplicationUser?: ClientApplicationUser;
  paymentGateway?: PaymentGateway;
}

schedule.scheduleJob('0 7 * * 1-5', async () => {
  const today = new Date();

  const date = `${today.getHours()}:${
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
  }`;
  const financialMoviments = await createQueryBuilder(
    FinancialMoviment,
    'financialMoviment',
  )
    .leftJoinAndSelect('financialMoviment.paymentGateway', 'paymentGateway')
    .leftJoinAndSelect('paymentGateway.paymentModule', 'paymentModule')
    .innerJoinAndSelect(
      'financialMoviment.clientApplicationUser',
      'clientApplicationUser',
    )
    .where(
      `financialMoviment.finished = "N" AND financialMoviment.payment_method = "B" AND paymentModule.module = "inter"`,
    )
    .groupBy('financialMoviment.client_application_id')
    .getMany();
  for (const financialMoviment of financialMoviments) {
    if (financialMoviment) {
      const clientApplicationUser = financialMoviment.clientApplicationUser;
      asyncLocalStorage.run(
        {
          id: clientApplicationUser.id,
          client_application_id: clientApplicationUser.client_application_id,
          role: clientApplicationUser.client_application_role_id,
          type: 'ClientApplicationUser',
        },
        async () => {
          const startDate = moment().subtract(30, 'day').format('YYYY-MM-DD');
          const endDate = moment().format('YYYY-MM-DD');

          const getListBankSlipFinancialMovimentPayment = container.resolve(
            GetListBankSlipService,
          );
          const listBankSlip =
            await getListBankSlipFinancialMovimentPayment.execute({
              paymentGateway: financialMoviment.paymentGateway,
              params: {
                dataInicial: startDate,
                dataFinal: endDate,
                situacao: 'PAGO',
              },
            });
          if (listBankSlip?.content.length) {
            for (const bankSlip of listBankSlip?.content) {
              const getByDocumentNumberService = container.resolve(
                GetByDocumentNumberService,
              );
              const financialMovimentPayment =
                await getByDocumentNumberService.execute({
                  client_application_id:
                    financialMoviment.client_application_id,
                  document_number: bankSlip.nossoNumero,
                });
              if (financialMovimentPayment) {
                if (financialMovimentPayment.situation !== 'Paid') {
                  const copyFinancialMovimentPayment = {
                    ...financialMovimentPayment,
                  };
                  const updateFinancialMovimentPaymentService =
                    container.resolve(UpdateFinancialMovimentPaymentService);

                  await updateFinancialMovimentPaymentService.execute({
                    ...copyFinancialMovimentPayment,
                    situation: 'Paid',
                    payment_date: new Date(
                      moment(bankSlip.dataHoraSituacao).format(
                        'YYYY-MM-DDTHH:mm:ss[Z]',
                      ),
                    ),
                  });
                  const copyFinancialMoviment: IFinancialMoviment | undefined =
                    await createQueryBuilder(
                      FinancialMoviment,
                      'financialMoviment',
                    )
                      .where(
                        `id = ${financialMovimentPayment.financial_moviment_id} AND client_application_id = ${financialMoviment.client_application_id}`,
                      )
                      .getOne();
                  delete copyFinancialMoviment?.clientApplicationUser;
                  delete copyFinancialMoviment?.paymentGateway;
                  const ormRepository = getRepository(FinancialMoviment);
                  await ormRepository.save({
                    ...copyFinancialMoviment,
                    finished: 'S',
                    downloaded_at: new Date(
                      moment(bankSlip.dataHoraSituacao).format(
                        'YYYY-MM-DDTHH:mm:ss[Z]',
                      ),
                    ),
                    downloaded_user_id: financialMoviment.client_application_id,
                  });
                }
              }
            }
          }
        },
      );
    }
  }

  console.log(
    'Cron para conciliação de boletos para o banco inter executada às',
    date,
  );
});

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333!');
});
