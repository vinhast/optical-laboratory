import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PaymentModulesController from '@modules/financial/infra/http/controllers/PaymentModulesController';

const paymentModulesRouter = Router();
const paymentModulesController = new PaymentModulesController();

paymentModulesRouter.get('/', paymentModulesController.list, () => {
  /*  
    #swagger.tags = ['PaymentModules']
    #swagger.path = '/paymentModules'
    #swagger.description = "List payment Modules"
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

paymentModulesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      module: Joi.string().required(),
      type: Joi.string().required(),
      fields: Joi.object().required(),
      name: Joi.string().required(),
    },
  }),
  paymentModulesController.create,
  () => {
    /*  
    #swagger.tags = ['PaymentModules']
    #swagger.path = '/paymentModules'
    #swagger.description = "Create payment Module"
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
                        "$ref": "#/components/schemas/PaymentModule"
                      }                    
                  }
              }
          }
  */
  },
);

paymentModulesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  paymentModulesController.get,
  () => {
    /*  
    #swagger.tags = ['PaymentModules']
    #swagger.path = '/paymentModules/view/{id}'
    #swagger.description = "View payment Module"
    #swagger.security = [{
    "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Not found payment Module"
    }
    #swagger.responses[200] = {
      description: "OK",
    }
  */
  },
);

paymentModulesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      module: Joi.string().required(),
      type: Joi.string().required(),
      fields: Joi.object().required(),
      name: Joi.string().required(),
    },
  }),
  paymentModulesController.update,
  () => {
    /*  
    #swagger.tags = ['PaymentModules']
    #swagger.path = '/paymentModules/update/{id}'
    #swagger.description = "Update payment Module"
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
                        "$ref": "#/components/schemas/PaymentModule"
                      }                    
                  }
              }
          }
  */
  },
);

paymentModulesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  paymentModulesController.delete,
  () => {
    /*  
    #swagger.tags = ['PaymentModules']
    #swagger.path = '/paymentModules/{id}'
    #swagger.description = "Delete payment Module"
    #swagger.security = [{
    "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Not found payment Module"
    }
    #swagger.responses[204] = {
      description: "No Content",
    }
  */
  },
);

export default paymentModulesRouter;
