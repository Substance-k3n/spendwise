import { Router } from 'express';
import { healthController } from './health.controller';

// Routes map URLs to controllers. Mounted at /api/health in src/routes/index.ts.
export const healthRouter = Router();

healthRouter.get('/', healthController);
