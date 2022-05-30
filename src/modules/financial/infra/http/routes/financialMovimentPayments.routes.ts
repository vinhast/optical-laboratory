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
      #swagger.path = '/financial/financialMovimentPayments'
      #swagger.tags = ['FinancialMovimentPayment']
      #swagger.description = "Get bank slip of financial moviment"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

financialMovimentPaymentRouter.get(
  '/bankSlipPDF/:payment_gateway_id/:ourNumber',
  financialMovimentPaymentController.getBankSlipPDF,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentPayments/bankSlipPDF/{payment_gateway_id}/{ourNumber}'
      #swagger.tags = ['FinancialMovimentPayment']
      #swagger.description = "Get bank slip pdf"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

financialMovimentPaymentRouter.get(
  '/list/bankSlip/:payment_gateway_id',
  financialMovimentPaymentController.getListBankSlip,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentPayments/list/bankSlip/{payment_gateway_id}'
      #swagger.tags = ['FinancialMovimentPayment']
      #swagger.description = "Get list bank slip"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

financialMovimentPaymentRouter.post(
  '/cancel/bankSlipPDF/',
  financialMovimentPaymentController.cancelBankSlip,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentPayments/cancel/bankSlipPDF'
      #swagger.tags = ['FinancialMovimentPayment']
      #swagger.description = "Cancel bank slip"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

financialMovimentPaymentRouter.post(
  '/create/bankSlipPDF/',
  financialMovimentPaymentController.createBankSlip,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentPayments/create/bankSlipPDF/'
      #swagger.tags = ['FinancialMovimentPayment']
      #swagger.description = "Create bank slip"
      #swagger.security = [{
        "bearerAuth": []
      }]
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
