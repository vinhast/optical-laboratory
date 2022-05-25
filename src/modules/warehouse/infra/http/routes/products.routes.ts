import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductsController from '@modules/warehouse/infra/http/controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.list, () => {
  /*
     #swagger.tags = ['Product']
     #swagger.path = '/warehouse/products'
     #swagger.description = "List products"
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

productsRouter.get('/search', productsController.search, () => {
  /*
     #swagger.tags = ['Product']
     #swagger.path = '/warehouse/products'
     #swagger.description = "List products"
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

productsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productsController.get,
  () => {
    /*
     #swagger.tags = ['Product']
     #swagger.path = '/warehouse/products/view/{id}'
     #swagger.description = "View product"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_category_id: Joi.number().required(),
      side: Joi.string().required(),
      cylindrical: Joi.string().required(),
      spherical: Joi.string().required(),
      price: Joi.string(),
      bars_code: Joi.string(),
      active: Joi.string().required(),
    },
  }),
  productsController.create,
  () => {
    /*
     #swagger.tags = ['Product']
     #swagger.path = '/warehouse/products'
     #swagger.description = "Create product"
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
              "$ref": "#/components/schemas/Product"
            }

          }
        }
      }
      }
    */
  },
);
productsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      product_category_id: Joi.number().required(),
      side: Joi.string().required(),
      cylindrical: Joi.string().required(),
      spherical: Joi.string().required(),
      price: Joi.string(),
      bars_code: Joi.string(),
      active: Joi.string().required(),
    },
  }),
  productsController.update,
  () => {
    /*
     #swagger.tags = ['Product']
     #swagger.path = '/warehouse/products/update/{id}'
     #swagger.description = "Update product"
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
              "$ref": "#/components/schemas/Product"
            }

          }
        }
      }
      }
    */
  },
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productsController.delete,
  () => {
    /*
     #swagger.tags = ['Product']
     #swagger.path = '/warehouse/products/{id}'
     #swagger.description = "Delete product"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found"
      }
      #swagger.responses[204] = {
        description: "OK",
      }
    */
  },
);

export default productsRouter;
