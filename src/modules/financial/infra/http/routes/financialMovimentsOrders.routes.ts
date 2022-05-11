import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FinancialMovimentsOrdersController from '@modules/financial/infra/http/controllers/FinancialMovimentsOrdersController';

const financialMovimentOrderRouter = Router();
const financialMovimentOrderController =
  new FinancialMovimentsOrdersController();

financialMovimentOrderRouter.get(
  '/',
  financialMovimentOrderController.list,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsOrders'
      #swagger.tags = ['FinancialMovimentOrder']
      #swagger.description = "List all financialMovimentsOrders"
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
financialMovimentOrderRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentOrderController.get,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsOrders/view/{id}'
      #swagger.tags = ['FinancialMovimentOrder']
      #swagger.description = "View financialMovimentOrder"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financialMovimentOrder"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

financialMovimentOrderRouter.post(
  '/',
  financialMovimentOrderController.create,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsOrders'
      #swagger.tags = ['FinancialMovimentOrder']
      #swagger.description = "Create financialMovimentOrder"
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
                        "$ref": "#/components/schemas/FinancialMovimentOrder"
                       },
                  }
              }
          }
    } */
  },
);
financialMovimentOrderRouter.put(
  '/update/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentOrderController.update,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsOrders/update/{id}'
      #swagger.tags = ['FinancialMovimentOrder']
      #swagger.description = "Update financialMovimentOrder"
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
                        "$ref": "#/components/schemas/FinancialMovimentOrder"
                       },
              }
          }
    } */
  },
);

financialMovimentOrderRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentOrderController.delete,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsOrders/{id}'
      #swagger.tags = ['FinancialMovimentOrder']
      #swagger.description = "Delete financialMovimentOrder"
      #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financialMovimentOrder"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

export default financialMovimentOrderRouter;
