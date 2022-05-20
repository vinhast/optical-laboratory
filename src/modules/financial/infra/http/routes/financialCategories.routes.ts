import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FinancialCategoriesController from '@modules/financial/infra/http/controllers/FinancialCategoriesController';

const financialCategoriesRouter = Router();
const financialCategoriesController = new FinancialCategoriesController();

financialCategoriesRouter.get('/', financialCategoriesController.list, () => {
  /*
      #swagger.path = '/financial/categories'
      #swagger.tags = ['FinancialCategory']
      #swagger.description = "List financial categories"
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
financialCategoriesRouter.get(
  '/list',
  financialCategoriesController.listCategoriesAndSubCategories,
  () => {
    /*
        #swagger.path = '/financial/categories/list'
        #swagger.tags = ['FinancialCategory']
        #swagger.description = "List financial categories and yours sub categories"
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
financialCategoriesRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialCategoriesController.get,
  () => {
    /*
      #swagger.path = '/financial/categories/view/{id}'
      #swagger.tags = ['FinancialCategory']
      #swagger.description = "View financial category"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financial category"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);
financialCategoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null),
      type: Joi.string().allow(null),
    },
  }),
  financialCategoriesController.create,
  () => {
    /*
        #swagger.path = '/financial/categories'
        #swagger.tags = ['FinancialCategory']
        #swagger.description = "Create financial category"
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
                          "$ref": "#/components/schemas/Financial category"
                         },
                    }
                }
            }
      } */
  },
);
financialCategoriesRouter.put(
  '/update/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      parent_id: Joi.number().integer().allow(null),
      type: Joi.string().allow(null),
    },
  }),
  financialCategoriesController.update,
  () => {
    /*
      #swagger.path = '/financial/categories/update/{id}'
      #swagger.tags = ['FinancialCategory']
      #swagger.description = "Update financial category"
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
                        "$ref": "#/components/schemas/Financial category"
                       },
              }
          }
    } */
  },
);

financialCategoriesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  financialCategoriesController.delete,
  () => {
    /*
      #swagger.path = '/financial/categories/{id}'
      #swagger.tags = ['FinancialCategory']
      #swagger.description = "Delete financial category"
      #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found financial category"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

export default financialCategoriesRouter;
