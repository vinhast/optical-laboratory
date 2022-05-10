import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import StockMovimentsController from '@modules/warehouse/infra/http/controllers/StockMovimentsController';

const stockMovimentsRouter = Router();
const stockMovimentsController = new StockMovimentsController();

stockMovimentsRouter.get('/', stockMovimentsController.list, () => {
  /* 
     #swagger.tags = ['StockMoviment']
     #swagger.path = '/stockMoviments'
     #swagger.description = "List stock moviments"
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

stockMovimentsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  stockMovimentsController.get,
  () => {
    /* 
     #swagger.tags = ['StockMoviment']
     #swagger.path = '/stockMoviments/view/{id}'
     #swagger.description = "View stock moviment"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);
stockMovimentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.number().required(),
      order_id: Joi.number(),
      financial_moviment_id: Joi.number(),
      user_id: Joi.number().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      origin: Joi.string().required(),
      quantity: Joi.number().required(),
    },
  }),
  stockMovimentsController.create,
  () => {
    /* 
     #swagger.tags = ['StockMoviment']
     #swagger.path = '/stockMoviments'
     #swagger.description = "Create stock moviment"
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
              "$ref": "#/components/schemas/StockMoviment"
            }
            
          }
        }
      }
      }
    */
  },
);
stockMovimentsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.number().required(),
      order_id: Joi.number(),
      financial_moviment_id: Joi.number(),
      user_id: Joi.number().required(),
      description: Joi.string().required(),
      type: Joi.string().required(),
      origin: Joi.string().required(),
      quantity: Joi.number().required(),
    },
  }),
  stockMovimentsController.update,
  () => {
    /* 
     #swagger.tags = ['StockMoviment']
     #swagger.path = '/stockMoviments/update/{id}'
     #swagger.description = "Update stock moviment"
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
              "$ref": "#/components/schemas/StockMoviment"
            }
            
          }
        }
      }
      }
    */
  },
);

stockMovimentsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  stockMovimentsController.delete,
  () => {
    /* 
     #swagger.tags = ['StockMoviment']
     #swagger.path = '/stockMoviments/{id}'
     #swagger.description = "Delete stock moviment"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

export default stockMovimentsRouter;
