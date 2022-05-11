import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SalesTablesController from '@modules/users/infra/http/controllers/SalesTablesController';

const salesTablesRouter = Router();
const salesTablesController = new SalesTablesController();

salesTablesRouter.get('/', salesTablesController.list, () => {
  /*
     #swagger.tags = ['SalesTables']
     #swagger.path = '/users/salesTables/'
     #swagger.description = "List salesTables"
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

salesTablesRouter.post('/', salesTablesController.create, () => {
  /*
    #swagger.tags = ['SalesTables']
    #swagger.path = '/users/salesTables/'
    #swagger.description = "Create saleTable"
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
                "$ref": "#/components/schemas/SaleTable"
              },
          }
      }
    }
  */
});

salesTablesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesController.get,
  () => {
    /*
     #swagger.tags = ['SalesTables']
     #swagger.path = '/users/salesTables/view/{id}'
     #swagger.description = "View saleTable"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found saleTable"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

salesTablesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesController.update,
  () => {
    /*
     #swagger.tags = ['SalesTables']
     #swagger.path = '/users/salesTables/update/{id}'
     #swagger.description = "Update saleTable"
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
                  "$ref": "#/components/schemas/SaleTable"
                },
            }
        }
      }
    */
  },
);

salesTablesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  salesTablesController.delete,
  () => {
    /*
     #swagger.tags = ['SalesTables']
     #swagger.path = '/users/salesTables/{id}'
     #swagger.description = "Delete saleTable"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found saleTable"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

export default salesTablesRouter;
