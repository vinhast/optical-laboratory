import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
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
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
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
