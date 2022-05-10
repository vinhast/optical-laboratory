import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UnitTypesController from '@modules/warehouse/infra/http/controllers/UnitTypesController';

const unitTypesRouter = Router();
const unitTypesController = new UnitTypesController();

unitTypesRouter.get('/', unitTypesController.list, () => {
  /* 
     #swagger.tags = ['UnitType']
     #swagger.path = '/unitTypes'
     #swagger.description = "List unit types"
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
unitTypesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  unitTypesController.get,
  () => {
    /* 
     #swagger.tags = ['UnitType']
     #swagger.path = '/unitTypes/view/{id}'
     #swagger.description = "View unit type"
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
unitTypesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      abbreviation: Joi.string().required(),
    },
  }),
  unitTypesController.create,
  () => {
    /* 
     #swagger.tags = ['UnitType']
     #swagger.path = '/unitTypes'
     #swagger.description = "Create unit type"
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
              "$ref": "#/components/schemas/UnitType"
            }
            
          }
        }
      }
      }
    */
  },
);
unitTypesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      abbreviation: Joi.string().required(),
    },
  }),
  unitTypesController.update,
  () => {
    /* 
     #swagger.tags = ['UnitType']
     #swagger.path = '/unitTypes/update/{id}'
     #swagger.description = "Update unit type"
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
              "$ref": "#/components/schemas/UnitType"
            }
            
          }
        }
      }
      }
    */
  },
);

unitTypesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  unitTypesController.delete,
  () => {
    /* 
     #swagger.tags = ['UnitType']
     #swagger.path = '/unitTypes/{id}'
     #swagger.description = "Delete unit type"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[204] = {
        description: "OK",
      }
    */
  },
);

export default unitTypesRouter;
