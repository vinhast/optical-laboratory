import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FinancialMovimentsTypesGroupsController from '@modules/financial/infra/http/controllers/FinancialMovimentsTypesGroupsController';

const financialMovimentTypeGroupRouter = Router();
const financialMovimentTypeGroupController =
  new FinancialMovimentsTypesGroupsController();

financialMovimentTypeGroupRouter.get(
  '/',
  financialMovimentTypeGroupController.list,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypesGroups'
      #swagger.tags = ['FinancialMovimentTypeGroup']
      #swagger.description = "List all financialMovimentsTypesGroups"
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
financialMovimentTypeGroupRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentTypeGroupController.get,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypesGroups/view/{id}'
      #swagger.tags = ['FinancialMovimentTypeGroup']
      #swagger.description = "View financialMovimentTypeGroup"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financialMovimentTypeGroup"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

financialMovimentTypeGroupRouter.post(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentTypeGroupController.create,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypesGroups'
      #swagger.tags = ['FinancialMovimentTypeGroup']
      #swagger.description = "Create financialMovimentTypeGroup"
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
                        "$ref": "#/components/schemas/FinancialMovimentTypeGroup"
                       },
                  }
              }
          }
    } */
  },
);
financialMovimentTypeGroupRouter.put(
  '/update/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentTypeGroupController.update,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypesGroups/update/{id}'
      #swagger.tags = ['FinancialMovimentTypeGroup']
      #swagger.description = "Update financialMovimentTypeGroup"
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
                        "$ref": "#/components/schemas/FinancialMovimentTypeGroup"
                       },
              }
          }
    } */
  },
);

financialMovimentTypeGroupRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialMovimentTypeGroupController.delete,
  () => {
    /*
      #swagger.path = '/financial/financialMovimentsTypesGroups/{id}'
      #swagger.tags = ['FinancialMovimentTypeGroup']
      #swagger.description = "Delete financialMovimentTypeGroup"
      #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financialMovimentTypeGroup"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

export default financialMovimentTypeGroupRouter;
