import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PermissionsController from '@modules/users/infra/http/controllers/PermissionsController';

const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      method: Joi.string().required(),
      base_url: Joi.string().required(),
      path: Joi.string().allow('', null),
    },
  }),
  permissionsController.create,
  () => {
    /*
     #swagger.tags = ['Permissions']
     #swagger.path = '/users/permissions'
     #swagger.description = "Create permission"
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
                      description: {
                        type: 'string',
                        example: 'test description'
                      },
                      method: {
                        type: 'string',
                        example: 'GET'
                      },
                      base_url: {
                        type: 'string',
                        example: 'test'
                      },
                      path: {
                        type: 'string',
                        example: 'test'
                      },
                    },
                  },

              }
          }
      }
    */
  },
);

permissionsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  permissionsController.get,
  () => {
    /*
     #swagger.tags = ['Permissions']
     #swagger.path = '/permissions/view/{id}'
     #swagger.description = "View permission"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found permission"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

permissionsRouter.get('/', permissionsController.list, () => {
  /*
     #swagger.tags = ['Permissions']
     #swagger.path = '/users/permissions'
     #swagger.description = "List permissions"
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
permissionsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      method: Joi.string().required(),
      base_url: Joi.string().required(),
      path: Joi.string().allow('', null),
    },
  }),
  permissionsController.update,
  () => {
    /*
     #swagger.tags = ['Permissions']
     #swagger.path = '/permissions/update/{id}'
     #swagger.description = "Update permision"
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
                      description: {
                        type: 'string',
                        example: 'test update description'
                      },
                      base_url: {
                        type: 'string',
                        example: 'test_update'
                      },
                      method: {
                        type: 'string',
                        example: 'POST'
                      },
                      path: {
                        type: 'string',
                        example: 'test_update'
                      },
                    },
                  },

              }
          }
      }
    */
  },
);

permissionsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  permissionsController.delete,
  () => {
    /*
     #swagger.tags = ['Permissions']
     #swagger.path = '/permissions/{id}'
     #swagger.description = "Delete permission"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found permission"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

export default permissionsRouter;
