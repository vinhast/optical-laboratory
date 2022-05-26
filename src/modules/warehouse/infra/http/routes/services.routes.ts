import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ServicesController from '@modules/warehouse/infra/http/controllers/ServicesController';

const servicesRouter = Router();
const servicesController = new ServicesController();

servicesRouter.get('/', servicesController.list, () => {
  /*
     #swagger.tags = ['Service']
     #swagger.path = '/warehouse/services'
     #swagger.description = "List services"
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

servicesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  servicesController.get,
  () => {
    /*
     #swagger.tags = ['Service']
     #swagger.path = '/warehouse/services/view/{id}'
     #swagger.description = "View service"
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
servicesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.string(),
      tables: Joi.array(),
    },
  }),
  servicesController.create,
  () => {
    /*
     #swagger.tags = ['Service']
     #swagger.path = '/warehouse/services'
     #swagger.description = "Create service"
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
              "$ref": "#/components/schemas/Service"
            }

          }
        }
      }
      }
    */
  },
);
servicesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.string(),
      tables: Joi.array(),
    },
  }),
  servicesController.update,
  () => {
    /*
     #swagger.tags = ['Service']
     #swagger.path = '/warehouse/services/update/{id}'
     #swagger.description = "Update service"
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
              "$ref": "#/components/schemas/Service"
            }

          }
        }
      }
      }
    */
  },
);

servicesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  servicesController.delete,
  () => {
    /*
     #swagger.tags = ['Service']
     #swagger.path = '/warehouse/services/{id}'
     #swagger.description = "Delete service"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found"
      }
      #swagger.responses[204] = {
        description: "OK",
      }
    */
  },
);

export default servicesRouter;
