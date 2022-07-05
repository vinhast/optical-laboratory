import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPasswordClientApplicationUserController from '@modules/users/infra/http/controllers/ForgotPasswordClientApplicationUserController';
import ResetPasswordClientApplicationUserController from '@modules/users/infra/http/controllers/ResetPasswordClientApplicationUserController';
import ForgotPasswordUserController from '@modules/users/infra/http/controllers/ForgotPasswordUserController';
import ResetPasswordUserController from '@modules/users/infra/http/controllers/ResetPasswordUserController';

const passwordRouter = Router();
const resetPasswordClientApplicationUserController =
  new ResetPasswordClientApplicationUserController();
const forgotPasswordClientApplicationUserController =
  new ForgotPasswordClientApplicationUserController();
const resetPasswordUserController = new ResetPasswordUserController();
const forgotPasswordUserController = new ForgotPasswordUserController();

passwordRouter.post(
  '/forgot/clientApplicationUser',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPasswordClientApplicationUserController.create,
  () => {
    /* 
     #swagger.tags = ['Password']
     #swagger.path = '/password/forgot'
     #swagger.description = "Forgot password"
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
                      email: {
                        type: 'string',
                        example: 'test@test.com'
                      },

                    },
                  },
                  
              }
          }
      }
    */
  },
);
passwordRouter.post(
  '/reset/clientApplicationUser',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  resetPasswordClientApplicationUserController.create,
  () => {
    /* 
     #swagger.tags = ['Password']
     #swagger.path = '/password/reset'
     #swagger.description = "Update password"
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
                      token: {
                        type: 'string',
                        example: 'test_token'
                      },
                      password: {
                        type: 'string',
                        example: 'test'
                      },
                      password_confirmation: {
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
passwordRouter.post(
  '/forgot/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
    },
  }),
  forgotPasswordUserController.create,
  () => {
    /* 
     #swagger.tags = ['Password']
     #swagger.path = '/password/forgot'
     #swagger.description = "Forgot password"
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
                      email: {
                        type: 'string',
                        example: 'test@test.com'
                      },

                    },
                  },
                  
              }
          }
      }
    */
  },
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  resetPasswordUserController.create,
  () => {
    /* 
     #swagger.tags = ['Password']
     #swagger.path = '/password/reset'
     #swagger.description = "Update password"
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
                      token: {
                        type: 'string',
                        example: 'test_token_uuid'
                      },
                      password: {
                        type: 'string',
                        example: 'test'
                      },
                      password_confirmation: {
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

export default passwordRouter;
