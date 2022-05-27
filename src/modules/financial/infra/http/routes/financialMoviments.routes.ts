import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FinancialMovimentController from '@modules/financial/infra/http/controllers/FinancialMovimentsController';

const financialMovimentRouter = Router();
const financialMovimentController = new FinancialMovimentController();

financialMovimentRouter.get('/', financialMovimentController.list, () => {
  /*
      #swagger.path = '/financial/financialMoviments'
      #swagger.tags = ['FinancialMoviment']
      #swagger.description = "List all financialMoviments"
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
});
financialMovimentRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentController.get,
  () => {
    /*
      #swagger.path = '/financial/financialMoviments/view/{id}'
      #swagger.tags = ['FinancialMoviment']
      #swagger.description = "View financialMoviment"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financialMoviment"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

financialMovimentRouter.post('/', financialMovimentController.create, () => {
  /*
      #swagger.path = '/financial/financialMoviments'
      #swagger.tags = ['FinancialMoviment']
      #swagger.description = "Create financialMoviment"
            #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Bad request"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
      #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                        "$ref": "#/components/schemas/FinancialMoviment"
                       },
                  }
              }
          }
    } */
});
financialMovimentRouter.put(
  '/update',
  financialMovimentController.updateAllFinancialMoviments,
  () => {
    /*
      #swagger.path = '/financial/financialMoviments/update'
      #swagger.tags = ['FinancialMoviment']
      #swagger.description = "Update many financial moviments same time"
            #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Bad request"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
      #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                        "$ref": "#/components/schemas/FinancialMovimentsUpdate"
                       },
              }
          }
    } */
  },
);
financialMovimentRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentController.update,
  () => {
    /*
      #swagger.path = '/financial/financialMoviments/update/{id}'
      #swagger.tags = ['FinancialMoviment']
      #swagger.description = "Update financialMoviment"
            #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Bad request"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
      #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                        "$ref": "#/components/schemas/FinancialMoviment"
                       },
              }
          }
    } */
  },
);

financialMovimentRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentController.delete,
  () => {
    /*
      #swagger.path = '/financial/financialMoviments/{id}'
      #swagger.tags = ['FinancialMoviment']
      #swagger.description = "Delete financialMoviment"
      #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financialMoviment"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

financialMovimentRouter.get(
  '/bankSlipPDF/:payment_gateway_id/:ourNumber',
  financialMovimentController.getBankSlipPDF,
  () => {
    /*
      #swagger.path = '/financial/financialMoviments/bankSlipPDF/{payment_gateway_id}/{ourNumber}'
      #swagger.tags = ['FinancialMoviment']
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

financialMovimentRouter.get(
  '/list/bankSlip/:payment_gateway_id',
  financialMovimentController.getListBankSlip,
  () => {
    /*
      #swagger.path = '/financial/financialMoviments/list/bankSlip/{payment_gateway_id}'
      #swagger.tags = ['FinancialMoviment']
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

financialMovimentRouter.post(
  '/cancel/bankSlipPDF/',
  financialMovimentController.cancelBankSlip,
  () => {
    /*
      #swagger.path = '/financial/financialMoviments/cancel/bankSlipPDF'
      #swagger.tags = ['FinancialMoviment']
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

financialMovimentRouter.post(
  '/create/bankSlipPDF/',
  financialMovimentController.createBankSlip,
  () => {
    /*
      #swagger.path = '/financial/financialMoviments/create/bankSlipPDF/'
      #swagger.tags = ['FinancialMoviment']
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

export default financialMovimentRouter;
