import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import OrderProductsController from '@modules/commercial/infra/http/controllers/OrderProductsController';

const orderProductsRouter = Router();
const orderProductsController = new OrderProductsController();

orderProductsRouter.get('/', orderProductsController.list, () => {
  /*  
      #swagger.path = '/orderProducts'
      #swagger.tags = ['OrderProducts']
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
        #swagger.path = '/orderProducts/view/{id}'
        #swagger.tags = ['OrderProducts']
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
        #swagger.path = '/orderProducts'
        #swagger.tags = ['OrderProducts']
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
                  },
                example: {
                  order_id: 1,
                        product_id: 1,
                        initial_price: '100',
                        single_discount: '100',
                        total_discount: '100',
                        charged_value: '100',
                        cashback_value: '100',
                        taxes: '100',
                        quantity: 1,
                        wrap: true,
                        released: true,
                        cfop: 1,
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
        #swagger.path = '/orderProducts/update/{id}'
        #swagger.tags = ['OrderProducts']
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
                  },
                example: {
                  order_id: 1,
                        product_id: 1,
                        initial_price: '100',
                        single_discount: '100',
                        total_discount: '100',
                        charged_value: '100',
                        cashback_value: '100',
                        taxes: '100',
                        quantity: 1,
                        wrap: true,
                        released: true,
                        cfop: 1,
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
        #swagger.path = '/orderProducts/{id}'
        #swagger.tags = ['OrderProducts']
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
