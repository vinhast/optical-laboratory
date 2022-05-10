import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/show', profileController.show, () => {
  /* 
    #swagger.tags = ['Profile']
     #swagger.path = '/users/profile/show'
     #swagger.description = "Show profile"
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

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().allow(null, ''),
      username: Joi.string().required(),
      password: Joi.string().allow(null, ''),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
  () => {
    /* 
     #swagger.tags = ['Profile']
     #swagger.path = '/users/profile/'
     #swagger.description = "Update profile"
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
                      email: {
                        type: 'string',
                        example: 'teste@teste.com'
                      },
                      old_password: {
                        type: 'string',
                        example: 'test_old'
                      },
                      username: {
                        type: 'string',
                        example: 'test'
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

export default profileRouter;
