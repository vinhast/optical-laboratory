import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import BankAccountController from '@modules/financial/infra/http/controllers/BankAccountsController';

const bankAccountRouter = Router();
const bankAccountController = new BankAccountController();

bankAccountRouter.get('/', bankAccountController.list, () => {
  /*
      #swagger.path = '/financial/bankAccounts'
      #swagger.tags = ['BankAccount']
      #swagger.description = "List all bank accounts"
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
bankAccountRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  bankAccountController.get,
  () => {
    /*
      #swagger.path = '/financial/bankAccounts/view/{id}'
      #swagger.tags = ['BankAccount']
      #swagger.description = "View bank account"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found bank account"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

bankAccountRouter.post('/', bankAccountController.create, () => {
  /*
      #swagger.path = '/financial/bankAccounts'
      #swagger.tags = ['BankAccount']
      #swagger.description = "Create bank account"
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
                        "$ref": "#/components/schemas/BankAccount"
                       },
                  }
              }
          }
    } */
});
bankAccountRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  bankAccountController.update,
  () => {
    /*
      #swagger.path = '/financial/bankAccounts/update/{id}'
      #swagger.tags = ['BankAccount']
      #swagger.description = "Update bank account"
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
                        "$ref": "#/components/schemas/BankAccount"
                       },
              }
          }
    } */
  },
);

bankAccountRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  bankAccountController.delete,
  () => {
    /*
      #swagger.path = '/financial/bankAccounts/{id}'
      #swagger.tags = ['BankAccount']
      #swagger.description = "Delete bank account"
      #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found bank account"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

export default bankAccountRouter;
