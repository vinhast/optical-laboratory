import { Router } from 'express';

import ClientsApplicationRolesController from '@modules/users/infra/http/controllers/ClientsApplicationRolesController';

const clientsApplicationRolesRouter = Router();
const clientsApplicationRolesController =
  new ClientsApplicationRolesController();

clientsApplicationRolesRouter.get(
  '/listByClientApplication/:client_application_id',
  clientsApplicationRolesController.listByClientApplication,
  () => {
    /*
      #swagger.tags = ['ClientsApplicationRoles']
      #swagger.path = '/users/clientsApplicationRoles/listByClientApplication/{client_application_id}/${client_application_id}'
      #swagger.description = "List clients applications roles by client application"
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

export default clientsApplicationRolesRouter;
