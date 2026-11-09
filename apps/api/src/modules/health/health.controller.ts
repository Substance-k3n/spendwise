import type { RequestHandler } from 'express';
import { getHealth } from './health.service';

// Controllers read the request, call a service, and send the response.
export const healthController: RequestHandler = async (_req, res) => {
  const health = await getHealth();
  res.status(health.status === 'ok' ? 200 : 503).json(health);
};
