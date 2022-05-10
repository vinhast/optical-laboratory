import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import RolesController from '@modules/users/infra/http/controllers/RolesController';

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.get('/', rolesController.list, () => {
  /* 
     #swagger.tags = ['Roles']
     #swagger.path = '/users/roles/'
     #swagger.description = "List roles"
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

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  rolesController.create,
  () => {
    /* 
     #swagger.tags = ['Roles']
     #swagger.path = '/users/roles/'
     #swagger.description = "Create role"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
      #swagger.responses[404] = {
        description: "Bad request"
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
                        example: 'test_role'
                      },
                      description: {
                        type: 'string',
                        example: 'test description role'
                      },
                    },
                  },
                  
              }
          }
      }
    */
  },
);

rolesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  rolesController.get,
  () => {
    /* 
     #swagger.tags = ['Roles']
     #swagger.path = '/users/roles/view/{id}'
     #swagger.description = "View role"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found role"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

rolesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  rolesController.update,
  () => {
    /* 
     #swagger.tags = ['Roles']
     #swagger.path = '/users/roles/update/{id}'
     #swagger.description = "Update role"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Bad request"
      }
      #swagger.responses[204] = {
        description: "No Content",
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
                        example: 'test_update_role'
                      },
                      description: {
                        type: 'string',
                        example: 'test update description role'
                      },
                    },
                  },
                  
              }
          }
      }
    */
  },
);

rolesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  rolesController.delete,
  () => {
    /* 
     #swagger.tags = ['Roles']
     #swagger.path = '/users/roles/{id}'
     #swagger.description = "Delete role"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found role"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

export default rolesRouter;
