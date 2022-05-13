import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FiscalSettingController from '@modules/financial/infra/http/controllers/FiscalSettingsController';

const fiscalSettingRouter = Router();
const fiscalSettingController = new FiscalSettingController();

fiscalSettingRouter.get('/', fiscalSettingController.list, () => {
  /*
      #swagger.path = '/financial/fiscalSettings'
      #swagger.tags = ['FiscalSetting']
      #swagger.description = "List all fiscalSettings"
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
fiscalSettingRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  fiscalSettingController.get,
  () => {
    /*
      #swagger.path = '/financial/fiscalSettings/view/{id}'
      #swagger.tags = ['FiscalSetting']
      #swagger.description = "View fiscalSetting"
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found fiscalSetting"
      }
      #swagger.responses[200] = {
        description: "OK",
      }
   */
  },
);

fiscalSettingRouter.post('/', fiscalSettingController.create, () => {
  /*
      #swagger.path = '/financial/fiscalSettings'
      #swagger.tags = ['FiscalSetting']
      #swagger.description = "Create fiscalSetting"
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
                        "$ref": "#/components/schemas/FiscalSetting"
                       },
                  }
              }
          }
    } */
});
fiscalSettingRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  fiscalSettingController.update,
  () => {
    /*
      #swagger.path = '/financial/fiscalSettings/update/{id}'
      #swagger.tags = ['FiscalSetting']
      #swagger.description = "Update fiscalSetting"
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
                        "$ref": "#/components/schemas/FiscalSetting"
                       },
              }
          }
    } */
  },
);

fiscalSettingRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  fiscalSettingController.delete,
  () => {
    /*
      #swagger.path = '/financial/fiscalSettings/{id}'
      #swagger.tags = ['FiscalSetting']
      #swagger.description = "Delete fiscalSetting"
      #swagger.security = [{
      "bearerAuth": []
      }]
      #swagger.responses[401] = {
        description: "Unauthorized"
      }
      #swagger.responses[404] = {
        description: "Not found fiscalSetting"
      }
      #swagger.responses[204] = {
        description: "No Content",
      }
    */
  },
);

export default fiscalSettingRouter;
