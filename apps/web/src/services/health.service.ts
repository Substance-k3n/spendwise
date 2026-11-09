import { type HealthResponse, healthResponseSchema } from '@spendwise/shared';
import { apiRequest } from '../lib/api-client';

export async function getHealth(): Promise<HealthResponse> {
  return healthResponseSchema.parse(await apiRequest<unknown>('/health'));
}
