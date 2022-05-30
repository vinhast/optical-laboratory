import { Router } from 'express';

import FinancialMovimentPaymentController from '@modules/financial/infra/http/controllers/FinancialMovimentPaymentsController';

const financialMovimentPaymentRouter = Router();
const financialMovimentPaymentController =
  new FinancialMovimentPaymentController();

financialMovimentPaymentRouter.get(
  '/:financial_moviment_id',
  financialMovimentPaymentController.getBankSlipPDF,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentPayments/{id}'
      #swagger.tags = ['FinancialMovimentPayment']
      #swagger.description = "Get bank slip of financial moviment"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[404] = {
        description: "Not found financial transaction"
      }
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

export default financialMovimentPaymentRouter;
