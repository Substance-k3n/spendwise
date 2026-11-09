import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { healthResponseSchema } from '@spendwise/shared';
import { createApp } from '../../src/app';

// Needs the database running (`pnpm db:up`) and DATABASE_URL set.
describe('GET /api/health', () => {
  it('reports the API and database as up', async () => {
    const res = await request(createApp()).get('/api/health');

    expect(res.status).toBe(200);
    expect(healthResponseSchema.parse(res.body)).toMatchObject({ status: 'ok', database: 'up' });
  });

  it('returns the shared error shape for unknown routes', async () => {
    const res = await request(createApp()).get('/api/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
