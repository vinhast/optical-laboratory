import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import RolesController from '@modules/users/infra/http/controllers/RolesController';

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.get('/', rolesController.list);

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  rolesController.create,
);

rolesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  rolesController.get,
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
);

rolesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  rolesController.delete,
);

export default rolesRouter;
