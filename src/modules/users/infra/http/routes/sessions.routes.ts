import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
  () => {
    /*
     #swagger.tags = ['Sessions']
     #swagger.path = '/sessions'
     #swagger.description = "Create session"
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
                      username: {
                        type: 'string',
                        example: 'test'
                      },
                      password: {
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
sessionsRouter.post(
  '/clientApplicationUser',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.createClientApplicationUser,
  () => {
    /*
     #swagger.tags = ['Sessions']
     #swagger.path = '/sessions'
     #swagger.description = "Create session"
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
                      username: {
                        type: 'string',
                        example: 'test'
                      },
                      password: {
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
sessionsRouter.post(
  '/createuser',
  celebrate({
    [Segments.BODY]: {
      role_id: Joi.number().required(),
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      active: Joi.boolean(),
      old_role_id: Joi.number(),
      old_user_id: Joi.number(),
      remote_access: Joi.boolean(),
    },
  }),
  sessionsController.create,
  () => {
    /*
     #swagger.tags = ['Sessions']
     #swagger.path = '/sessions/createuser'
     #swagger.description = "Create user"
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
                      role_id: {
                        type: 'number',
                        example: 1
                      },
                      name: {
                        type: 'string',
                        example: 'test'
                      },
                      username: {
                        type: 'string',
                        example: 'test'
                      },
                      password: {
                        type: 'string',
                        example: 'test'
                      },
                      email: {
                        type: 'string',
                        example: 'test@test.com'
                      },
                      active: {
                        type: 'boolean',
                        example: true
                      },
                      old_role_id: {
                        type: 'number',
                        example: 1
                      },
                      old_user_id: {
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

export default sessionsRouter;
