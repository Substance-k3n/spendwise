import { defineConfig } from 'tsdown';

// Bundles src/server.ts (plus @expenseflow/shared) into dist/server.js.
export default defineConfig({
  entry: ['src/server.ts'],
  format: 'esm',
  platform: 'node',
  target: 'node22',
  noExternal: [/^@expenseflow\//],
});
