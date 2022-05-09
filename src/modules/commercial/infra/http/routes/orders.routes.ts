import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import OrderController from '@modules/commercial/infra/http/controllers/OrderController';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/', orderController.list, () => {
  /*  
        #swagger.path = '/orders'
        #swagger.tags = ['Order']
        #swagger.description = "List orders"
        #swagger.security = [{
          "bearerAuth": []
        }]
      #swagger.responses[404] = {
        description: "Bad request"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
     */
});

orderRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  orderController.get,
  () => {
    /*  
        #swagger.path = '/orders/view/{id}'
        #swagger.tags = ['Order']
        #swagger.description = "View order "
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

orderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      os: Joi.string(),
      client_id: Joi.number().required(),
      products_value: Joi.string(),
      service_value: Joi.string(),
      lenses_value: Joi.string(),
      charged_value: Joi.string(),
      credit_value: Joi.string(),
      shipping_method: Joi.string(),
      shipping_value: Joi.string(),
      shipping_time: Joi.string(),
      payment_method: Joi.string(),
      payment_date: Joi.date(),
      installments: Joi.number(),
      status: Joi.number(),
      type: Joi.string().required(),
      profit: Joi.string().required(),
      note: Joi.string(),
      user_id: Joi.number(),
    },
  }),
  orderController.create,
  () => {
    /*  
        #swagger.path = '/orders'
        #swagger.tags = ['Order']
        #swagger.description = "Create order "
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
              "$ref": "#/components/schemas/Order"
            },
            example: {
              os: 'test_os',
              client_id: 1,
              products_value: '100',
              service_value: '100',
              lenses_value: '100',
              charged_value: '100',
              credit_value: '100',
              shipping_method: 'credit',
              shipping_value: '100',
              shipping_time: '90',
              payment_method: 'card',
              payment_date: '2022-04-05',
              installments: 1,
              status: 1,
              type: 'V',
              profit: 'N',
              note: 'test_note',
              user_id: 1,
            }
          }
        }
      }
      }
     */
  },
);

orderRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      os: Joi.string(),
      client_id: Joi.number().required(),
      products_value: Joi.string(),
      service_value: Joi.string(),
      lenses_value: Joi.string(),
      charged_value: Joi.string(),
      credit_value: Joi.string(),
      shipping_method: Joi.string(),
      shipping_value: Joi.string(),
      shipping_time: Joi.string(),
      payment_method: Joi.string(),
      payment_date: Joi.date(),
      installments: Joi.number(),
      status: Joi.number(),
      type: Joi.string().required(),
      profit: Joi.string().required(),
      note: Joi.string(),
      user_id: Joi.number(),
    },
  }),
  orderController.update,
  () => {
    /*  
        #swagger.path = '/orders/update/{id}'
        #swagger.tags = ['Order']
        #swagger.description = "Update order"
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
                  "$ref": "#/components/schemas/Order"
                  },
                example: {
                  os: 'test_os',
                  client_id: 1,
                  products_value: '100',
                  service_value: '100',
                  lenses_value: '100',
                  charged_value: '100',
                  credit_value: '100',
                  shipping_method: 'credit',
                  shipping_value: '100',
                  shipping_time: '90',
                  payment_method: 'card',
                  payment_date: '2022-04-05',
                  installments: 1,
                  status: 1,
                  type: 'V',
                  profit: 'N',
                  note: 'test_update_note',
                  user_id: 1,
                }
            }
        }
      }
      }
     */
  },
);

orderRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  orderController.delete,
  () => {
    /*  
        #swagger.path = '/orders/{id}'
        #swagger.tags = ['Order']
        #swagger.description = "Delete order"
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

export default orderRouter;
