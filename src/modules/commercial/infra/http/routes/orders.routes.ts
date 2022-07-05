import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import OrdersController from '@modules/commercial/infra/http/controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get('/', ordersController.list, () => {
  /*
        #swagger.path = '/commercial/orders'
        #swagger.tags = ['Order']
        #swagger.description = "List orders"
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

ordersRouter.post('/finishOrder/:id', ordersController.finishOrder, () => {
  /*
        #swagger.path = '/commercial/orders/finishOrder/{id}'
        #swagger.tags = ['Order']
        #swagger.description = "Status orders"
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

ordersRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  ordersController.get,
  () => {
    /*
        #swagger.path = '/commercial/orders/view/{id}'
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

ordersRouter.post(
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
      note: Joi.string().allow('', null),
      user_id: Joi.number(),
      products: Joi.array(),
      revenue: Joi.object().allow(null),
    },
  }),
  ordersController.create,
  () => {
    /*
        #swagger.path = '/commercial/orders'
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
            }
          }
        }
      }
      }
     */
  },
);

ordersRouter.put(
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
      note: Joi.string().allow('', null),
      user_id: Joi.number(),
      products: Joi.array(),
      revenue: Joi.object().allow(null),
    },
  }),
  ordersController.update,
  () => {
    /*
        #swagger.path = '/commercial/orders/update/{id}'
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
                  }
            }
        }
      }
      }
     */
  },
);

ordersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  ordersController.delete,
  () => {
    /*
        #swagger.path = '/commercial/orders/{id}'
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

export default ordersRouter;
