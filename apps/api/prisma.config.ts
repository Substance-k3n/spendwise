import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seeds/seed.ts',
  },
  datasource: {
    // Optional here so `prisma generate` works on a fresh clone without a .env.
    url: process.env.DATABASE_URL ?? '',
  },
});
