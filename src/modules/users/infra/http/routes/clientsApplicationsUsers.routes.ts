import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ClientsApplicationsUsersController from '@modules/users/infra/http/controllers/ClientsApplicationsUsersController';

const clientsApplicationsUsersRouter = Router();
const clientsApplicationsUsersController =
  new ClientsApplicationsUsersController();

clientsApplicationsUsersRouter.get(
  '/',
  clientsApplicationsUsersController.list,
  () => {
    /*
      #swagger.tags = ['ClientsApplicationsUsers']
      #swagger.path = '/clientsApplicationsUsers'
      #swagger.description = "List clients applications users"
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

clientsApplicationsUsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      role_id: Joi.number().allow(null),
      client_application_id: Joi.number().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      active: Joi.boolean(),
      token: Joi.string(),
      token_validate: Joi.number(),
    },
  }),
  clientsApplicationsUsersController.create,
  () => {
    /*
    #swagger.path = '/clientsApplicationsUsers'
    #swagger.tags = ['ClientsApplicationsUsers']
    #swagger.description = "Create client application user"
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
                        "$ref": "#/components/schemas/ClientApplicationUser"
                       }
                  }
              }
          }
    } */
  },
);

clientsApplicationsUsersRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientsApplicationsUsersController.get,
  () => {
    /*
     #swagger.tags = ['ClientsApplicationsUsers']
     #swagger.path = '/clientsApplicationsUsers/view/{id}'
     #swagger.description = "View client application user"
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

clientsApplicationsUsersRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      role_id: Joi.number().allow(null),
      client_application_id: Joi.number().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      active: Joi.boolean(),
      token: Joi.string(),
      token_validate: Joi.number(),
    },
  }),
  clientsApplicationsUsersController.update,
  () => {
    /*
     #swagger.tags = ['ClientsApplicationsUsers']
     #swagger.path = '/clientsApplicationsUsers/update/{id}'
     #swagger.description = "Update client application user"
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
                        "$ref": "#/components/schemas/ClientApplicationUser"
                       }
                  }
              }
          }
    */
  },
);

clientsApplicationsUsersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientsApplicationsUsersController.delete,
  () => {
    /*
     #swagger.tags = ['ClientsApplicationsUsers']
     #swagger.path = '/clientsApplicationsUsers/{id}'
     #swagger.description = "Delete client application user"
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
        description: "No Content",
      }
    */
  },
);

export default clientsApplicationsUsersRouter;
