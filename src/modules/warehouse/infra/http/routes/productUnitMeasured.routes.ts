import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductUnitMeasuredController from '@modules/warehouse/infra/http/controllers/ProductUnitMeasuredController';

const productUnitMeasuredRouter = Router();
const productUnitMeasuredController = new ProductUnitMeasuredController();

productUnitMeasuredRouter.get('/', productUnitMeasuredController.list, () => {
  /* 
  #swagger.path = '/productUnitMeasured'
  #swagger.tags = ['ProductUnitMeasured']
  #swagger.description = "List units measured"
  #swagger.security = [{
      "bearerAuth": []
  }]
  #swagger.responses[401] = {
    description: "Unauthorized"
  }
  #swagger.responses[200] = {
    description: "OK",
  }
  } */
});
productUnitMeasuredRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productUnitMeasuredController.get,
  () => {
    /* 
    #swagger.path = '/productUnitMeasured/view/{id}'
    #swagger.tags = ['ProductUnitMeasured']
    #swagger.description = "View unit measured"
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Not found unit measured"
    }
    #swagger.responses[200] = {
      description: "OK",
    }
    */
  },
);
productUnitMeasuredRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  productUnitMeasuredController.create,
  () => {
    /* 
    #swagger.path = '/productUnitMeasured'
    #swagger.tags = ['ProductUnitMeasured']
    #swagger.description = "Create unit measured"
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
                          }
                        }
                       },
                  }
              }
          }
    } */
  },
);
productUnitMeasuredRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  productUnitMeasuredController.update,
  () => {
    /* 
    #swagger.path = '/productUnitMeasured/update/{id}'
    #swagger.tags = ['ProductUnitMeasured']
    #swagger.description = "Update unit measured"
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

productUnitMeasuredRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productUnitMeasuredController.delete,
  () => {
    /* 
    #swagger.path = '/productUnitMeasured/{id}'
    #swagger.tags = ['ProductUnitMeasured']
    #swagger.description = "Delete unit measured"
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[401] = {
      description: "Unauthorized"
    }
    #swagger.responses[404] = {
      description: "Not found unit measured"
    }
    #swagger.responses[200] = {
      description: "OK",
    }
    */
  },
);

export default productUnitMeasuredRouter;
