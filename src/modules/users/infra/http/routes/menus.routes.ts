import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import MenusController from '@modules/users/infra/http/controllers/MenusController';

const menusRouter = Router();
const menusController = new MenusController();

menusRouter.get('/', menusController.list);
menusRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  menusController.get,
);
menusRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null, ''),
      controller: Joi.string().allow(null, ''),
      action: Joi.string().allow(null, ''),
      method: Joi.string().allow(null, ''),
      type: Joi.string().valid('cake', 'front'),
    },
  }),
  menusController.create,
);
menusRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null, ''),
      controller: Joi.string().allow(null, ''),
      method: Joi.string().allow(null, ''),
      action: Joi.string().allow(null, ''),
      type: Joi.string().valid('cake', 'front'),
    },
  }),
  menusController.update,
);

menusRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  menusController.delete,
);

export default menusRouter;
