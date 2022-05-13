import { Router } from 'express';
import clientsRouter from './clients.routes';

const commercialRouter = Router();

commercialRouter.use('/clients', clientsRouter);

export default commercialRouter;
