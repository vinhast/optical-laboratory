import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';
import multer from 'multer';
import DownloadsController from '../controllers/DownloadsController';

const downloadsRouter = Router();
const downloadsController = new DownloadsController();
const upload = multer(uploadConfig.multer);

downloadsRouter.get('/', downloadsController.list, () => {
  /*  
        #swagger.path = '/commercial/downloads'
        #swagger.tags = ['Download']
        #swagger.description = "List Downloads"
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

downloadsRouter.post(
  '/',
  upload.single('attachment'),
  downloadsController.create,
  () => {
    /*  
        #swagger.path = '/commercial/downloads'
        #swagger.tags = ['Download']
        #swagger.description = "Create Download"
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
              "$ref": "#/components/schemas/Download"
            }
            
          }
        }
      }
      }
     */
  },
);

downloadsRouter.get(
  '/view/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  downloadsController.get,
  () => {
    /*  
        #swagger.path = '/commercial/downloads/view/{id}'
        #swagger.tags = ['Download']
        #swagger.description = "View Download"
        #swagger.security = [{
          "bearerAuth": []
        }]
        #swagger.responses[404] = {
          description: "Not found"
        }
        #swagger.responses[401] = {
          description: "Unauthorized"
        }
        #swagger.responses[200] = {
          description: "OK",
        }
     */
  },
);

downloadsRouter.put(
  '/update/:id',
  upload.single('attachment'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  downloadsController.update,
  () => {
    /*  
      #swagger.path = '/commercial/downloads/update/{id}'
      #swagger.tags = ['Download']
      #swagger.description = "Update Download"
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
              "$ref": "#/components/schemas/Download"
            }
            
          }
        }
      }
      }
     */
  },
);

downloadsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  downloadsController.delete,
  () => {
    /*  
        #swagger.path = '/commercial/downloads/{id}'
        #swagger.tags = ['Download']
        #swagger.description = "Delete Download"
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

export default downloadsRouter;
