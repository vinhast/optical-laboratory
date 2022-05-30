import { Router } from 'express';
import bankAccountsRouter from './bankAccounts.routes';
import creditsRouter from './credits.routes';
import financialCategoriesRouter from './financialCategories.routes';
import financialMovimentPaymentRouter from './financialMovimentPayments.routes';
import financialMovimentsRouter from './financialMoviments.routes';
import financialMovimentsOrdersRouter from './financialMovimentsOrders.routes';
import financialMovimentsTypesRouter from './financialMovimentsTypes.routes';
import financialMovimentsTypesGroupsRouter from './financialMovimentsTypesGroups.routes';
import fiscalSettingsRouter from './fiscalSettings.routes';
import paymentGatewaysRouter from './paymentGateways.routes';
import paymentModulesRouter from './paymentModules.routes';

const financialRouter = Router();

financialRouter.use('/bankAccounts', bankAccountsRouter);
financialRouter.use('/credits', creditsRouter);
financialRouter.use('/financialMoviments', financialMovimentsRouter);
financialRouter.use(
  '/financialMovimentsOrders',
  financialMovimentsOrdersRouter,
);
financialRouter.use('/financialMovimentsTypes', financialMovimentsTypesRouter);
financialRouter.use(
  '/financialMovimentsTypesGroups',
  financialMovimentsTypesGroupsRouter,
);
financialRouter.use('/fiscalSettings', fiscalSettingsRouter);
financialRouter.use('/categories', financialCategoriesRouter);
financialRouter.use('/paymentGateways', paymentGatewaysRouter);
financialRouter.use('/paymentModules', paymentModulesRouter);
financialRouter.use(
  '/financialMovimentsPayments',
  financialMovimentPaymentRouter,
);
export default financialRouter;
