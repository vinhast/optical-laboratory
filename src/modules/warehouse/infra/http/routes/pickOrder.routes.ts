import { Router } from 'express';

import PickOrderController from '@modules/warehouse/infra/http/controllers/PickOrderController';

const pickOrderRouter = Router();

const pickOrderController = new PickOrderController();

pickOrderRouter.get('/pdf/:id', pickOrderController.pdf, () => {
  /* 
     #swagger.tags = ['PickOrder']
     #swagger.path = '/pickOrder/pdf/{id}'
     #swagger.description = "Generate pdf of order"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found order"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
});

export default pickOrderRouter;
