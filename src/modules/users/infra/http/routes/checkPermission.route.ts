import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CheckPermissionController from '@modules/users/infra/http/controllers/CheckPermissionController';

const checkPermissionRouter = Router();
const checkPermissionController = new CheckPermissionController();

checkPermissionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      method: Joi.string().required(),
      originalUrl: Joi.string().required(),
      role_id: Joi.number().required(),
      user_id: Joi.number().required(),
    },
  }),
  checkPermissionController.execute,
  () => {
    /* 
     #swagger.tags = ['CheckPermission']
     #swagger.path = '/checkPermission'
     #swagger.description = "Check if user has permission"
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
                      method: {
                        type: 'string',
                        example: 'GET'
                      },
                      originalUrl: {
                        type: 'string',
                        example: '/users'
                      },
                      role_id: {
                        type: 'number',
                        example: 1
                      },
                      user_id: {
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

export default checkPermissionRouter;
