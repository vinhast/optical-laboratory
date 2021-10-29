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
);

permissionsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  permissionsController.get,
);

permissionsRouter.get('/', permissionsController.list);

permissionsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      method: Joi.string().required(),
      base_url: Joi.string().required(),
      path: Joi.string(),
    },
  }),
  permissionsController.update,
);

permissionsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  permissionsController.delete,
);

export default permissionsRouter;
