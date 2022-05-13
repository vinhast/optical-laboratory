import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CreditController from '@modules/financial/infra/http/controllers/CreditsController';

const creditRouter = Router();
const creditController = new CreditController();

creditRouter.get('/', creditController.list, () => {
  /*
      #swagger.path = '/financial/credits'
      #swagger.tags = ['Credit']
      #swagger.description = "List all credits"
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
creditRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  creditController.get,
  () => {
    /*
      #swagger.path = '/financial/credits/view/{id}'
      #swagger.tags = ['Credit']
      #swagger.description = "View credit"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found credit"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

creditRouter.post('/', creditController.create, () => {
  /*
      #swagger.path = '/financial/credits'
      #swagger.tags = ['Credit']
      #swagger.description = "Create credit"
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
                        "$ref": "#/components/schemas/Credit"
                       },
                  }
              }
          }
    } */
});
creditRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  creditController.update,
  () => {
    /*
      #swagger.path = '/financial/credits/update/{id}'
      #swagger.tags = ['Credit']
      #swagger.description = "Update credit"
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
                        "$ref": "#/components/schemas/Credit"
                       },
              }
          }
    } */
  },
);

creditRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  creditController.delete,
  () => {
    /*
      #swagger.path = '/financial/credits/{id}'
      #swagger.tags = ['Credit']
      #swagger.description = "Delete credit"
      #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found credit"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

export default creditRouter;
