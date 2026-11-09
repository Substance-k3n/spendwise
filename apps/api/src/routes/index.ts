import { Router } from 'express';
import { healthRouter } from '../modules/health/health.routes';

// Every module's router is mounted here. Add a line per module, e.g.
// apiRouter.use('/expenses', expensesRouter);
export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
