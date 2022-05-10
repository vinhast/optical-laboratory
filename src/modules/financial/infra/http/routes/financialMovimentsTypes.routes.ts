import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FinancialMovimentsTypesController from '@modules/financial/infra/http/controllers/FinancialMovimentsTypesController';

const financialMovimentTypeRouter = Router();
const financialMovimentTypeController = new FinancialMovimentsTypesController();

financialMovimentTypeRouter.get(
  '/',
  financialMovimentTypeController.list,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypes'
      #swagger.tags = ['FinancialMovimentType']
      #swagger.description = "List all financialMovimentsTypes"
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
financialMovimentTypeRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentTypeController.get,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypes/view/{id}'
      #swagger.tags = ['FinancialMovimentType']
      #swagger.description = "View financialMovimentType"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financialMovimentType"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

financialMovimentTypeRouter.post(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentTypeController.create,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypes'
      #swagger.tags = ['FinancialMovimentType']
      #swagger.description = "Create financialMovimentType"
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
                        "$ref": "#/components/schemas/FinancialMovimentType"
                       },
                  }
              }
          }
    } */
  },
);
financialMovimentTypeRouter.put(
  '/update/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentTypeController.update,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypes/update/{id}'
      #swagger.tags = ['FinancialMovimentType']
      #swagger.description = "Update financialMovimentType"
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
                        "$ref": "#/components/schemas/FinancialMovimentType"
                       },
              }
          }
    } */
  },
);

financialMovimentTypeRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentTypeController.delete,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypes/{id}'
      #swagger.tags = ['FinancialMovimentType']
      #swagger.description = "Delete financialMovimentType"
      #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financialMovimentType"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

export default financialMovimentTypeRouter;
