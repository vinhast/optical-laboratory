import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import StocksController from '@modules/warehouse/infra/http/controllers/StocksController';

const stocksRouter = Router();
const stocksController = new StocksController();

stocksRouter.get('/', stocksController.list, () => {
  /* 
     #swagger.tags = ['Stocks']
     #swagger.path = '/stocks'
     #swagger.description = "List items of stock"
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

stocksRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  stocksController.delete,
  () => {
    /* 
     #swagger.tags = ['Stocks']
     #swagger.path = '/stocks/{id}'
     #swagger.description = "Delete stock item"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found item"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

export default stocksRouter;
