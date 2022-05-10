import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductCategoriesController from '@modules/warehouse/infra/http/controllers/ProductCategoriesController';

const productCategoriesRouter = Router();
const productCategoriesController = new ProductCategoriesController();

productCategoriesRouter.get('/', productCategoriesController.list, () => {
  /* 
     #swagger.tags = ['ProductCategories']
     #swagger.path = '/productCategories'
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
      page, keyword, perPage, orderByField, orderBySort
      #swagger.parameters['page'] = {
        description: 'Current page',
        required: true,
        type: 'number',
        schema: 'number',
        
        example: 1
      }
      #swagger.parameters['keyword'] = {
        description: 'word search',
        required: true,
        type: 'string',
        schema: 'string',
        
        example: 'test'
      }
      #swagger.parameters['perPage'] = {
        description: 'Quantity items per page',
        required: true,
        type: 'number',
        schema:  'number',
        
        example: 5
      }
      #swagger.parameters['orderByField'] = {
        description: 'Order by field',
        required: false,
        type: 'string',
        schema: 'string',
        
        example: 'test'
      }
      #swagger.parameters['orderBySort'] = {
        description: 'Order by sort',
        required: false,
        type: 'string',
        schema: 'string',
        example: 'ASC'
      }
    */
});
productCategoriesRouter.get(
  '/list',
  productCategoriesController.listAll,
  () => {
    /* 
     #swagger.tags = ['ProductCategories']
     #swagger.path = '/productCategories/list'
     #swagger.description = "List categories with relation"
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
productCategoriesRouter.get(
  '/listGenerateRevenue',
  productCategoriesController.listGenerateRevenue,
  () => {
    /* 
     #swagger.tags = ['ProductCategories']
     #swagger.path = '/productCategories/listGenerateRevenue'
     #swagger.description = "List category with generate revenue"
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
     #swagger.tags = ['ProductCategories']
     #swagger.path = '/productCategories/view/{id}'
     #swagger.description = "View category"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found category"
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
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null),
      generate_revenue: Joi.boolean(),
    },
  }),
  productCategoriesController.create,
  () => {
    /* 
     #swagger.tags = ['ProductCategories']
     #swagger.path = '/productCategories'
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
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'test'
                      },
                      parent_id: {
                        type: 'number',
                        example: 1
                      },
                      generate_revenue: {
                        type: 'boolean',
                        example: true
                      },
                    },
                  },
                  
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
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null),
      generate_revenue: Joi.boolean(),
    },
  }),
  productCategoriesController.update,
  () => {
    /* 
     #swagger.tags = ['ProductCategories']
     #swagger.path = '/productCategories/update/{id}'
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
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'test_update'
                      },
                      parent_id: {
                        type: 'number',
                        example: 1
                      },
                      generate_revenue: {
                        type: 'boolean',
                        example: false
                      },
                    },
                  },
                  
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
     #swagger.tags = ['ProductCategories']
     #swagger.path = '/productCategories/{id}'
     #swagger.description = "Delete category"
         #swagger.security = [{
        "bearerAuth": []
    }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found category"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
    */
  },
);

export default productCategoriesRouter;
