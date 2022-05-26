import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SalesTablesPricesServicesController from '@modules/users/infra/http/controllers/SalesTablesPricesServicesController';

const salesTablesPricesServicesRouter = Router();
const salesTablesPricesServicesController =
  new SalesTablesPricesServicesController();

salesTablesPricesServicesRouter.get(
  '/',
  salesTablesPricesServicesController.list,
  () => {
    /*
     #swagger.tags = ['SalesTablesPricesServices']
     #swagger.path = '/users/salesTablesPricesServices/'
     #swagger.description = "List salesTablesPricesServices"
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
  },
);

salesTablesPricesServicesRouter.post(
  '/',
  salesTablesPricesServicesController.create,
  () => {
    /*
    #swagger.tags = ['SalesTablesPricesServices']
    #swagger.path = '/users/salesTablesPricesServices/'
    #swagger.description = "Create saleTablePriceService"
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
                "$ref": "#/components/schemas/SaleTablePriceService"
              },
          }
      }
    }
  */
  },
);

salesTablesPricesServicesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesPricesServicesController.get,
  () => {
    /*
     #swagger.tags = ['SalesTablesPricesServices']
     #swagger.path = '/users/salesTablesPricesServices/view/{id}'
     #swagger.description = "View saleTablePriceService"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found saleTablePriceService"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

salesTablesPricesServicesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesPricesServicesController.update,
  () => {
    /*
     #swagger.tags = ['SalesTablesPricesServices']
     #swagger.path = '/users/salesTablesPricesServices/update/{id}'
     #swagger.description = "Update saleTablePriceService"
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
                  "$ref": "#/components/schemas/SaleTablePriceService"
                },
            }
        }
      }
    */
  },
);

salesTablesPricesServicesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesPricesServicesController.delete,
  () => {
    /*
     #swagger.tags = ['SalesTablesPricesServices']
     #swagger.path = '/users/salesTablesPricesServices/{id}'
     #swagger.description = "Delete saleTablePriceService"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found saleTablePriceService"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

export default salesTablesPricesServicesRouter;
