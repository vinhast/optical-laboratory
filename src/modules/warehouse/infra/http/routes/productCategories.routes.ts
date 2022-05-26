import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductCategoriesController from '@modules/warehouse/infra/http/controllers/ProductCategoriesController';

const productCategoriesRouter = Router();
const productCategoriesController = new ProductCategoriesController();

productCategoriesRouter.get('/', productCategoriesController.list, () => {
  /*
     #swagger.tags = ['ProductCategory']
     #swagger.path = '/warehouse/productCategories'
     #swagger.description = "List categories"
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

productCategoriesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productCategoriesController.get,
  () => {
    /*
     #swagger.tags = ['ProductCategory']
     #swagger.path = '/warehouse/productCategories/view/{id}'
     #swagger.description = "View category"
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
productCategoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      parent_id: Joi.number().integer().allow(null),
      user_id: Joi.number(),
      name: Joi.string().required(),
      description: Joi.string(),
      type: Joi.string(),
      ncm: Joi.number(),
      cst: Joi.number(),
      cfop: Joi.number(),
      cfop_out_of_state: Joi.number(),
      unit_type_id: Joi.number(),
      lense_type: Joi.string(),
      lense_side: Joi.string(),
      price: Joi.string(),
      spherical_start: Joi.number(),
      spherical_end: Joi.number(),
      cylindrical_start: Joi.number(),
      cylindrical_end: Joi.number(),
      addition_start: Joi.number(),
      addition_end: Joi.number(),
      online: Joi.string(),
      dir: Joi.number(),
      cover: Joi.string(),
      tables: Joi.array(),
    },
  }),
  productCategoriesController.create,
  () => {
    /*
     #swagger.tags = ['ProductCategory']
     #swagger.path = '/warehouse/productCategories'
     #swagger.description = "Create category"
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
            "$ref": "#/components/schemas/ProductCategory"
          }

        }
      }
      }
      }
    */
  },
);
productCategoriesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      parent_id: Joi.number().integer().allow(null),
      user_id: Joi.number(),
      name: Joi.string().required(),
      description: Joi.string(),
      type: Joi.string(),
      ncm: Joi.number(),
      cst: Joi.number(),
      cfop: Joi.number(),
      cfop_out_of_state: Joi.number(),
      unit_type_id: Joi.number(),
      lense_type: Joi.string(),
      lense_side: Joi.string(),
      price: Joi.string(),
      spherical_start: Joi.number(),
      spherical_end: Joi.number(),
      cylindrical_start: Joi.number(),
      cylindrical_end: Joi.number(),
      addition_start: Joi.number(),
      addition_end: Joi.number(),
      online: Joi.string(),
      dir: Joi.number(),
      cover: Joi.string(),
      tables: Joi.array(),
    },
  }),
  productCategoriesController.update,
  () => {
    /*
     #swagger.tags = ['ProductCategory']
     #swagger.path = '/warehouse/productCategories/update/{id}'
     #swagger.description = "Update category"
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
            "$ref": "#/components/schemas/ProductCategory"
          }

        }
      }
      }
      }
    */
  },
);

productCategoriesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productCategoriesController.delete,
  () => {
    /*
     #swagger.tags = ['ProductCategory']
     #swagger.path = '/warehouse/productCategories/{id}'
     #swagger.description = "Delete category"
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

export default productCategoriesRouter;
