import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.get('/', clientsController.list, () => {
  /*  
        #swagger.path = '/clients'
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
      cnpj: Joi.string().required(),
      company_name: Joi.string().required(),
      table_id: Joi.number().required(),
    },
  }),
  clientsController.create,
  () => {
    /*  
        #swagger.path = '/clients'
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
        #swagger.path = '/clients/view/{id}'
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
      cnpj: Joi.string().required(),
      company_name: Joi.string().required(),
      table_id: Joi.number().required(),
    },
  }),
  clientsController.update,
  () => {
    /*  
      #swagger.path = '/clients/update/{id}'
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
        #swagger.path = '/clients/{id}'
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
