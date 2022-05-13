import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProvidersController from '@modules/commercial/infra/http/controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.get('/', providersController.list, () => {
  /*  
        #swagger.path = '/commercial/providers'
        #swagger.tags = ['Provider']
        #swagger.description = "List Providers"
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

providersRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  providersController.get,
  () => {
    /*  
        #swagger.path = '/commercial/providers/view/{id}'
        #swagger.tags = ['Provider']
        #swagger.description = "View Provider "
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

providersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_social_name: Joi.string().required(),
      company_name: Joi.string().required(),
      cnpj: Joi.string(),
      phone: Joi.string().required(),
      mobile: Joi.string(),
      email: Joi.string(),
      street: Joi.string(),
      number: Joi.string(),
      complement: Joi.string(),
      district: Joi.string(),
      zip_code: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      ibge: Joi.number(),
      note: Joi.string(),
      active: Joi.string().required(),
    },
  }),
  providersController.create,
  () => {
    /*  
        #swagger.path = '/commercial/providers'
        #swagger.tags = ['Provider']
        #swagger.description = "Create Provider "
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
              "$ref": "#/components/schemas/Provider"
            },
          }
        }
      }
      }
     */
  },
);

providersRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      company_social_name: Joi.string().required(),
      company_name: Joi.string().required(),
      cnpj: Joi.string(),
      phone: Joi.string().required(),
      mobile: Joi.string(),
      email: Joi.string(),
      street: Joi.string(),
      number: Joi.string(),
      complement: Joi.string(),
      district: Joi.string(),
      zip_code: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      ibge: Joi.number(),
      note: Joi.string(),
      active: Joi.string().required(),
    },
  }),
  providersController.update,
  () => {
    /*  
        #swagger.path = '/commercial/providers/update/{id}'
        #swagger.tags = ['Provider']
        #swagger.description = "Update Provider"
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
                  "$ref": "#/components/schemas/Provider"
                  },
            }
        }
      }
      }
     */
  },
);

providersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  providersController.delete,
  () => {
    /*  
        #swagger.path = '/commercial/providers/{id}'
        #swagger.tags = ['Provider']
        #swagger.description = "Delete Provider"
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

export default providersRouter;
