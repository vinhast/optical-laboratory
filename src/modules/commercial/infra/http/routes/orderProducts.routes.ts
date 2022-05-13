import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import OrderProductsController from '@modules/commercial/infra/http/controllers/OrderProductsController';

const orderProductsRouter = Router();
const orderProductsController = new OrderProductsController();

orderProductsRouter.get('/', orderProductsController.list, () => {
  /*  
      #swagger.path = '/commercial/orderProducts'
      #swagger.tags = ['OrderProduct']
      #swagger.description = "List order products"
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
orderProductsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  orderProductsController.get,
  () => {
    /*  
        #swagger.path = '/commercial/orderProducts/view/{id}'
        #swagger.tags = ['OrderProduct']
        #swagger.description = "View order product"
        #swagger.security = [{
          "bearerAuth": []
        }]
        #swagger.responses[404] = {
          description: "Not found"
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

orderProductsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.number().integer().required(),
      product_id: Joi.number().integer().required(),
      initial_price: Joi.string().required(),
      single_discount: Joi.string(),
      total_discount: Joi.string(),
      charged_value: Joi.string().required(),
      cashback_value: Joi.string(),
      taxes: Joi.string(),
      quantity: Joi.number().integer().required(),
      wrap: Joi.boolean(),
      released: Joi.boolean(),
      cfop: Joi.number(),
    },
  }),
  orderProductsController.create,
  () => {
    /*  
        #swagger.path = '/commercial/orderProducts'
        #swagger.tags = ['OrderProduct']
        #swagger.description = "Create order product"
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
                  "$ref": "#/components/schemas/OrderProduct"
                  }
            }
        }
      }
      }
     */
  },
);
orderProductsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.number().integer().required(),
      product_id: Joi.number().integer().required(),
      initial_price: Joi.string().required(),
      single_discount: Joi.string(),
      total_discount: Joi.string(),
      charged_value: Joi.string().required(),
      cashback_value: Joi.string(),
      taxes: Joi.string(),
      quantity: Joi.number().integer().required(),
      wrap: Joi.boolean(),
      released: Joi.boolean(),
      cfop: Joi.number(),
    },
  }),
  orderProductsController.update,
  () => {
    /*  
        #swagger.path = '/commercial/orderProducts/update/{id}'
        #swagger.tags = ['OrderProduct']
        #swagger.description = "Update order product"
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
                  "$ref": "#/components/schemas/OrderProduct"
                  }
            }
        }
      }
      }
     */
  },
);

orderProductsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  orderProductsController.delete,
  () => {
    /*  
        #swagger.path = '/commercial/orderProducts/{id}'
        #swagger.tags = ['OrderProduct']
        #swagger.description = "Delete order product"
        #swagger.security = [{
          "bearerAuth": []
        }]
        #swagger.responses[404] = {
          description: "Not found"
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

export default orderProductsRouter;
