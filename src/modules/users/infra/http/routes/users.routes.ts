import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import AvatarUserController from '@modules/users/infra/http/controllers/AvatarUserController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import rolesRouter from './roles.routes';
import profileRouter from './profile.routes';
import permissionsRouter from './permissions.routes';
import salesTablesRouter from './salesTables.routes';
import salesTablesPricesRouter from './salesTablesPrices.routes';
import clientsApplicationsUsersRouter from './clientsApplicationsUsers.routes';
import clientsApplicationsRolesRouter from './clientsApplicationRoles.routes';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new AvatarUserController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      role_id: Joi.number().required(),
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      active: Joi.boolean(),
      remote_access: Joi.boolean(),
    },
  }),
  usersController.create,
  () => {
    /*
    #swagger.path = '/users'
    #swagger.tags = ['Users']
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
                        "$ref": "#/components/schemas/User"
                       },
                      examples: {
                        user: {
                          value: {
                            role_id: 1,
                            name: "Test",
                            username: "Test",
                            email: "test@test.com",
                            password: "teste",
                            active: true,
                            remote_access: true,
                          }
                        }
                      }
                  }
              }
          }
    } */
  },
);

usersRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  usersController.get,
  () => {
    /*
     #swagger.tags = ['Users']
     #swagger.path = '/users/view/{id}'
     #swagger.description = "View user"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found user"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

usersRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  usersController.update,
  () => {
    /*
     #swagger.tags = ['Users']
     #swagger.path = '/users/update/{id}'
     #swagger.description = "Update user"
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
                        "$ref": "#/components/schemas/User"
                       },
                      examples: {
                        user: {
                          value: {
                            role_id: 1,
                            name: "Test_update",
                            username: "Test_update",
                            email: "test_update@test.com",
                            password: "teste",
                            active: true,
                            remote_access: true,
                          }
                        }
                      }
                  }
              }
          }
    */
  },
);

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  usersController.delete,
  () => {
    /*
     #swagger.tags = ['Users']
     #swagger.path = '/users/{id}'
     #swagger.description = "Delete user"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found user"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
  () => {
    /*
     #swagger.tags = ['Users']
     #swagger.path = '/users/avatar'
     #swagger.description = "Update avatar user"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found user"
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

usersRouter.use('/roles', rolesRouter);
usersRouter.use('/profile', profileRouter);
usersRouter.use('/permissions', permissionsRouter);
usersRouter.use('/salesTables', salesTablesRouter);
usersRouter.use('/salesTablesPrices', salesTablesPricesRouter);
usersRouter.use('/clientsApplicationsUsers', clientsApplicationsUsersRouter);
usersRouter.use('/clientsApplicationsRoles', clientsApplicationsRolesRouter);

export default usersRouter;
