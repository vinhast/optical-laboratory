import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductAttributesController from '@modules/warehouse/infra/http/controllers/ProductAttributesController';

const productAttributesRouter = Router();
const productAttributesController = new ProductAttributesController();

productAttributesRouter.get('/', productAttributesController.list, () => {
  /* 
     #swagger.tags = ['ProductAttributes']
     #swagger.path = '/productAttributes'
     #swagger.description = "List attributes"
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
productAttributesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productAttributesController.get,
  () => {
    /* 
     #swagger.tags = ['ProductAttributes']
     #swagger.path = '/productAttributes/view/{id}'
     #swagger.description = "View attribute"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found attribute"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);
productAttributesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null),
    },
  }),
  productAttributesController.create,
  () => {
    /* 
     #swagger.tags = ['ProductAttributes']
     #swagger.path = '/productAttributes'
     #swagger.description = "Create attribute"
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
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'test'
                      },
                      parent_id: {
                        type: 'number',
                        example: 1
                      },
                    },
                  },
                  
              }
          }
      }
    */
  },
);
productAttributesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null),
    },
  }),
  productAttributesController.update,
  () => {
    /* 
     #swagger.tags = ['ProductAttributes']
     #swagger.path = '/productAttributes/update/{id}'
     #swagger.description = "Update attribute"
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
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'test_update'
                      },
                      parent_id: {
                        type: 'number',
                        example: 1
                      },
                    },
                  },
                  
              }
          }
      }
    */
  },
);

productAttributesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productAttributesController.delete,
  () => {
    /* 
     #swagger.tags = ['ProductAttributes']
     #swagger.path = '/productAttributes/{id}'
     #swagger.description = "Delete attribute"
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
  },
);

export default productAttributesRouter;
