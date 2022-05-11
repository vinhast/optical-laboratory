import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CacheController from '@modules/cache/infra/http/controllers/CacheController';

const cacheRouter = Router();
const cacheController = new CacheController();

cacheRouter.get('/', cacheController.list, () => {
  /*  
    #swagger.path = '/cache'
    #swagger.tags = ['Cache']
    #swagger.description = "List cache keys"
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

cacheRouter.delete(
  '/:key',
  celebrate({
    [Segments.PARAMS]: {
      key: Joi.string().required(),
    },
  }),
  cacheController.delete,
  () => {
    /*
      #swagger.path = '/cache/{key}'
      #swagger.tags = ['Cache']
      #swagger.description = "Delete key cache"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
      description: "Unauthorized"
      }
      #swagger.responses[404] = {
      description: "Not found key"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
     */
  },
);

export default cacheRouter;
