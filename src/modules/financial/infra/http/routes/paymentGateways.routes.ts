import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PaymentGatewaysController from '@modules/financial/infra/http/controllers/PaymentGatewaysController';
import uploadConfig from '@config/upload';
import multer from 'multer';

const paymentGatewaysRouter = Router();
const paymentGatewaysController = new PaymentGatewaysController();
const upload = multer(uploadConfig.multer);

paymentGatewaysRouter.get('/', paymentGatewaysController.list, () => {
  /*  
    #swagger.tags = ['PaymentGateways']
    #swagger.path = '/paymentGateways'
    #swagger.description = "List payment gateways"
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

paymentGatewaysRouter.post('/', paymentGatewaysController.create, () => {
  /*  
    #swagger.tags = ['PaymentGateways']
    #swagger.path = '/paymentGateways'
    #swagger.description = "Create payment gateway"
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
                        "$ref": "#/components/schemas/PaymentGateway"
                      },
                      example: {
                          name: 'test_name',
                          status: 'test_status',
                          currency: '{}'
                      }                      
                  }
              }
          }
  */
});

paymentGatewaysRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  paymentGatewaysController.get,
  () => {
    /*  
    #swagger.tags = ['PaymentGateways']
    #swagger.path = '/paymentGateways/view/{id}'
    #swagger.description = "View payment gateway"
    #swagger.security = [{
    "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Not found payment gateway"
    }
    #swagger.responses[200] = {
      description: "OK",
    }
  */
  },
);

paymentGatewaysRouter.put(
  '/update/:id',
  upload.any(),
  paymentGatewaysController.update,
  () => {
    /*  
    #swagger.tags = ['PaymentGateways']
    #swagger.path = '/paymentGateways/update/{id}'
    #swagger.description = "Update payment gateway"
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
                        "$ref": "#/components/schemas/PaymentGateway"
                      },
                      example: {
                          name: 'test_name_update',
                          status: 'test_status_update',
                          currency: '{}',
                      }                      
                  }
              }
          }
  */
  },
);

paymentGatewaysRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  paymentGatewaysController.delete,
  () => {
    /*  
    #swagger.tags = ['PaymentGateways']
    #swagger.path = '/paymentGateways/{id}'
    #swagger.description = "Delete payment gateway"
    #swagger.security = [{
    "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Not found payment gateway"
    }
    #swagger.responses[204] = {
      description: "No Content",
    }
  */
  },
);

export default paymentGatewaysRouter;
