import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SalesTablesPricesController from '@modules/users/infra/http/controllers/SalesTablesPricesController';

const salesTablesPricesRouter = Router();
const salesTablesPricesController = new SalesTablesPricesController();

salesTablesPricesRouter.get('/', salesTablesPricesController.list, () => {
  /*
     #swagger.tags = ['SalesTablesPrices']
     #swagger.path = '/users/salesTablesPrices/'
     #swagger.description = "List salesTablesPrices"
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

salesTablesPricesRouter.post('/', salesTablesPricesController.create, () => {
  /*
    #swagger.tags = ['SalesTablesPrices']
    #swagger.path = '/users/salesTablesPrices/'
    #swagger.description = "Create saleTablePrice"
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[200] = {
      description: "OK",
    }
    #swagger.responses[404] = {
      description: "Bad request"
    }
          #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                "$ref": "#/components/schemas/SaleTablePrice"
              },
          }
      }
    }
  */
});

salesTablesPricesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesPricesController.get,
  () => {
    /*
     #swagger.tags = ['SalesTablesPrices']
     #swagger.path = '/users/salesTablesPrices/view/{id}'
     #swagger.description = "View saleTablePrice"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found saleTablePrice"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

salesTablesPricesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesPricesController.update,
  () => {
    /*
     #swagger.tags = ['SalesTablesPrices']
     #swagger.path = '/users/salesTablesPrices/update/{id}'
     #swagger.description = "Update saleTablePrice"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Bad request"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
      #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                  "$ref": "#/components/schemas/SaleTablePrice"
                },
            }
        }
      }
    */
  },
);

salesTablesPricesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesPricesController.delete,
  () => {
    /*
     #swagger.tags = ['SalesTablesPrices']
     #swagger.path = '/users/salesTablesPrices/{id}'
     #swagger.description = "Delete saleTablePrice"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found saleTablePrice"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

export default salesTablesPricesRouter;
