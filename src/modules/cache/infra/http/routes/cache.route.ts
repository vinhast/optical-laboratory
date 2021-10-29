import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CacheController from '@modules/cache/infra/http/controllers/CacheController';

const campaingsRouter = Router();
const cacheController = new CacheController();

campaingsRouter.get('/', cacheController.list);

campaingsRouter.delete(
  '/:key',
  celebrate({
    [Segments.PARAMS]: {
      key: Joi.string().required(),
    },
  }),
  cacheController.delete,
);

export default campaingsRouter;
