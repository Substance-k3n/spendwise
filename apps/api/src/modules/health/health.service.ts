import type { HealthResponse } from '@expenseflow/shared';
import { prisma } from '../../lib/prisma';

// Services hold the logic and talk to the database. They know nothing about HTTP.
export async function getHealth(): Promise<HealthResponse> {
  let database: HealthResponse['database'] = 'up';
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    database = 'down';
  }

  return {
    status: database === 'up' ? 'ok' : 'degraded',
    database,
    uptimeSeconds: Math.round(process.uptime()),
  };
}
