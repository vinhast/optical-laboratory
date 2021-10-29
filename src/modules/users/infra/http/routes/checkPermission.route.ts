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
);

export default checkPermissionRouter;
