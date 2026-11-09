// Fills a local database with sample data. Run with `pnpm --filter @expenseflow/api db:seed`.
// Add seed data here once the first models exist in prisma/schema.prisma.
async function main() {
  console.info('Nothing to seed yet.');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
