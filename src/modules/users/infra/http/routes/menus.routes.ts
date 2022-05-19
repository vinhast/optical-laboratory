import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import MenusController from '@modules/users/infra/http/controllers/MenusController';

const menusRouter = Router();
const menusController = new MenusController();

menusRouter.get('/', menusController.list, () => {
  /* 
     #swagger.tags = ['Menus']
     #swagger.path = '/menus'
     #swagger.description = "List menus"
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
menusRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  menusController.get,
  () => {
    /* 
     #swagger.tags = ['Menus']
     #swagger.path = '/menus/view/{id}'
     #swagger.description = "View menu"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found menu",
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);
menusRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null, ''),
      controller: Joi.string().allow(null, ''),
      action: Joi.string().allow(null, ''),
      method: Joi.string().allow(null, ''),
      icon: Joi.string().allow(null, ''),
    },
  }),
  menusController.create,
  () => {
    /* 
     #swagger.tags = ['Menus']
     #swagger.path = '/menus'
     #swagger.description = "Create menu"
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
                        example: 'test',
                      },
                      parent_id: {
                        type: 'number',
                        example: 1
                      },
                      controller: {
                        type: 'string',
                        example: 'test_route',
                      },
                      action: {
                        type: 'string',
                        example: 'test_path',
                      },
                      method: {
                        type: 'string',
                        example: 'POST',
                      },
                      icon: {
                        type: 'string',
                        example: 'fa fa-users',
                      },
                    },
                  },
                  
              }
          }
      }
    */
  },
);
menusRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null, ''),
      controller: Joi.string().allow(null, ''),
      method: Joi.string().allow(null, ''),
      icon: Joi.string().allow(null, ''),
      action: Joi.string().allow(null, ''),
    },
  }),
  menusController.update,
  () => {
    /* 
     #swagger.tags = ['Menus']
     #swagger.path = '/menus/update/{id}'
     #swagger.description = "Update menu"
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
                        example: 'test_update',
                      },
                      parent_id: {
                        type: 'number',
                        example: 1
                      },
                      controller: {
                        type: 'string',
                        example: 'test_update_route',
                      },
                      action: {
                        type: 'string',
                        example: 'test_update_path',
                      },
                      method: {
                        type: 'string',
                        example: 'POST',
                      },
                      icon: {
                        type: 'string',
                        example: 'fa fa-users',
                      },
                    },
                  },
                  },
                  
              }
          }
      }
    */
  },
);

menusRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  menusController.delete,
  () => {
    /* 
     #swagger.tags = ['Menus']
     #swagger.path = '/menus/{id}'
     #swagger.description = "Delete menu"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
      #swagger.responses[404] = {
        description: "Not found menu",
      }
    */
  },
);

export default menusRouter;
