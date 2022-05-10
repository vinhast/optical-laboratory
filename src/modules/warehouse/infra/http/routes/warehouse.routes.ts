import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import WarehouseController from '@modules/warehouse/infra/http/controllers/WarehouseController';

const warehouseRouter = Router();
const warehouseController = new WarehouseController();

warehouseRouter.get('/', warehouseController.list, () => {
  /* 
    #swagger.path = '/warehouse'
    #swagger.tags = ['Warehouse']
    #swagger.description = "List warehouses"
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

warehouseRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      details: Joi.object().required(),
      active: Joi.boolean().required(),
    },
  }),
  warehouseController.create,
  () => {
    /* 
    #swagger.path = '/warehouse'
    #swagger.tags = ['Warehouse']
    #swagger.description = "Create warehouse"
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Bad request"
    }
    #swagger.responses[200] = {
      description: "OK",
    }
     #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { 
                        properties: {
                          name: {
                            type: 'string',
                            example: 'test'
                          },
                          details: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                example: '1.000,00'
                              },
                              price: {
                                type: 'string',
                                example: '1.000,00'
                              },
                              value: {
                                type: 'string',
                                example: '1.000,00'
                              }
                            }
                          },
                          active: {
                            type: 'boolean',
                            example: true
                          }
                        }
                       },
                  }
              }
          }
    } 
    */
  },
);

warehouseRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  warehouseController.get,
  () => {
    /* 
    #swagger.path = '/warehouse/view/{id}'
    #swagger.tags = ['Warehouse']
    #swagger.description = "View warehouse"
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Not found warehouse"
    }
    #swagger.responses[200] = {
      description: "OK",
    }
     */
  },
);

warehouseRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      details: Joi.object().required(),
      active: Joi.boolean().required(),
    },
  }),
  warehouseController.update,
  () => {
    /* 
    #swagger.path = '/warehouse/update/{id}'
    #swagger.tags = ['Warehouse']
    #swagger.description = "Update warehouse"
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
      #swagger.responses[404] = {
        description: "Bad request"
      }
    #swagger.responses[200] = {
      description: "OK",
    }
          #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { 
                        properties: {
                          name: {
                            type: 'string',
                            example: 'test_update'
                          },
                          details: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                example: '2.000,00'
                              },
                              price: {
                                type: 'string',
                                example: '2.000,00'
                              },
                              value: {
                                type: 'string',
                                example: '2.000,00'
                              }
                            },
                          },
                          active: {
                            type: 'boolean',
                            example: true
                          }
                        }
                       },
                  }
              }
          }
    } 
     */
  },
);

warehouseRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  warehouseController.delete,
  () => {
    /* 
    #swagger.path = '/warehouse/{id}'
    #swagger.tags = ['Warehouse']
    #swagger.description = "Delete warehouse"
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Not found warehouse"
    }
    #swagger.responses[204] = {
      description: "No Content",
    }
    */
  },
);

export default warehouseRouter;
