import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.get('/', clientsController.list, () => {
  /*  
        #swagger.path = '/commercial/clients'
        #swagger.tags = ['Client']
        #swagger.description = "List clients"
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

clientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      table_id: Joi.number().required(),
      company_name: Joi.string().required(),
      company_social_name: Joi.string(),
      cnpj: Joi.string().required(),
      state_registration: Joi.string(),
      city_registration: Joi.string(),
      street: Joi.string(),
      number: Joi.string(),
      complement: Joi.string(),
      district: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zip_code: Joi.string(),
      ibge: Joi.number(),
      phone_1: Joi.string().allow('', null),
      phone_2: Joi.string().allow('', null),
      mobile: Joi.string().allow('', null),
      email: Joi.string().allow('', null),
      note: Joi.string().allow('', null),
      shipment_method: Joi.string(),
      payment_method: Joi.string(),
      active: Joi.string(),
      cnpjSearch: Joi.object().allow(null),
    },
  }),
  clientsController.create,
  () => {
    /*  
        #swagger.path = '/commercial/clients'
        #swagger.tags = ['Client']
        #swagger.description = "Create client"
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
              "$ref": "#/components/schemas/Client"
            }
            
          }
        }
      }
      }
     */
  },
);

clientsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientsController.get,
  () => {
    /*  
        #swagger.path = '/commercial/clients/view/{id}'
        #swagger.tags = ['Client']
        #swagger.description = "View client"
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

clientsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      table_id: Joi.number().required(),
      company_name: Joi.string().required(),
      company_social_name: Joi.string(),
      cnpj: Joi.string().required(),
      state_registration: Joi.string(),
      city_registration: Joi.string(),
      street: Joi.string(),
      number: Joi.string(),
      complement: Joi.string(),
      district: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zip_code: Joi.string(),
      ibge: Joi.number(),
      phone_1: Joi.string().allow('', null),
      phone_2: Joi.string().allow('', null),
      mobile: Joi.string().allow('', null),
      email: Joi.string().allow('', null),
      note: Joi.string().allow('', null),
      shipment_method: Joi.string(),
      payment_method: Joi.string(),
      active: Joi.string(),
    },
  }),
  clientsController.update,
  () => {
    /*  
      #swagger.path = '/commercial/clients/update/{id}'
      #swagger.tags = ['Client']
      #swagger.description = "Update client"
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
              "$ref": "#/components/schemas/Client"
            }
            
          }
        }
      }
      }
     */
  },
);

clientsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientsController.delete,
  () => {
    /*  
        #swagger.path = '/commercial/clients/{id}'
        #swagger.tags = ['Client']
        #swagger.description = "Delete client"
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

export default clientsRouter;
