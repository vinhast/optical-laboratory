import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';

import ClientApplicationsController from '@shared/infra/http/controllers/ClientApplicationsController';
import AvatarClientApplicationController from '@shared/infra/http/controllers/AvatarClientApplicationController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const clientApplicationsRouter = Router();
const upload = multer(uploadConfig.multer);
const clientApplicationsController = new ClientApplicationsController();
const avatarClientApplicationController =
  new AvatarClientApplicationController();

clientApplicationsRouter.get('/', clientApplicationsController.list, () => {
  /*
      #swagger.tags = ['ClientApplications']
      #swagger.path = '/clientApplications'
      #swagger.description = "List client applications"
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
});

clientApplicationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      avatar: Joi.string(),
      cnpj: Joi.string().required(),
      street: Joi.string(),
      number: Joi.string(),
      complement: Joi.string(),
      district: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zip_code: Joi.string(),
      phone: Joi.string(),
      mobile: Joi.string(),
    },
  }),
  clientApplicationsController.create,
  () => {
    /*
    #swagger.path = '/clientApplications'
    #swagger.tags = ['ClientApplications']
    #swagger.description = "Create client application"
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
                        "$ref": "#/components/schemas/ClientApplication"
                       }
                      
                  }
              }
          }
    } */
  },
);

clientApplicationsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientApplicationsController.get,
  () => {
    /*
     #swagger.tags = ['ClientApplications']
     #swagger.path = '/clientApplications/view/{id}'
     #swagger.description = "View client application"
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

clientApplicationsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      avatar: Joi.string(),
      cnpj: Joi.string().required(),
      street: Joi.string(),
      number: Joi.string(),
      complement: Joi.string(),
      district: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zip_code: Joi.string(),
      phone: Joi.string(),
      mobile: Joi.string(),
    },
  }),
  clientApplicationsController.update,
  () => {
    /*
     #swagger.tags = ['ClientApplications']
     #swagger.path = '/clientApplications/update/{id}'
     #swagger.description = "Update client application"
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
                        "$ref": "#/components/schemas/ClientApplication"
                       }
                      
                  }
              }
          }
    */
  },
);

clientApplicationsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientApplicationsController.delete,
  () => {
    /*
     #swagger.tags = ['ClientApplications']
     #swagger.path = '/clientApplications/{id}'
     #swagger.description = "Delete client application"
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

clientApplicationsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarClientApplicationController.update,
  () => {
    /*
     #swagger.tags = ['ClientApplications']
     #swagger.path = '/clientApplications/avatar'
     #swagger.description = "Update avatar client application"
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
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: 'object',
              properties: {
                avatar: {
                  type: 'string',
                  format: 'binary'
                }
              }
            },
          }
        }
      }
    */
  },
);

export default clientApplicationsRouter;
