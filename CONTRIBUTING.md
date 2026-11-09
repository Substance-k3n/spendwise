# Contributing

How we work on ExpenseFlow. Set up the project first with the steps in the [README](README.md).

## Branches

- `main` — what is released. Nobody pushes here directly.
- `dev` — where finished work comes together. All pull requests go into `dev`.
- Your branch — one per task, created from the latest `dev`.

Name your branch after the kind of change and what it is:

| Prefix     | Use for                       | Example                       |
| ---------- | ----------------------------- | ----------------------------- |
| `feature/` | new functionality             | `feature/expense-submit-form` |
| `fix/`     | bug fixes                     | `fix/budget-total-rounding`   |
| `chore/`   | tooling, dependencies, config | `chore/update-prisma`         |
| `docs/`    | documentation only            | `docs/approvals-api`          |

## Step by step

```bash
git switch dev
git pull                                   # always start from the latest dev
git switch -c feature/expense-submit-form  # your branch

# …make your changes, commit often…

pnpm lint && pnpm typecheck && pnpm test   # must pass before you push
git push -u origin feature/expense-submit-form
```

Then open a pull request **into `dev`** on GitHub and fill in the template.

If `dev` moved on while you were working, update your branch before asking for review:

```bash
git switch dev && git pull
git switch feature/expense-submit-form
git merge dev
```

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): what changed`.

```
feat(expenses): add expense submission endpoint
fix(web): show validation errors on the expense form
test(approvals): cover rejecting an already approved expense
docs(api): document the budgets endpoints
chore: update eslint
```

Types: `feat`, `fix`, `test`, `docs`, `refactor`, `style`, `chore`. The scope is the module or app
you touched.

## Pull requests

- **Small.** One feature or fix per PR. A PR you can review in 15 minutes gets merged; one that
  touches 40 files waits.
- **Green CI.** GitHub runs format, lint, typecheck, tests and build on every PR. Fix any red check
  before asking for review. `pnpm format` fixes formatting for you.
- **Tested.** Backend changes need a test in `apps/api/tests`. UI changes need a screenshot in the
  PR description.
- **Reviewed.** At least one approval before merging. Reply to every comment, push fixes as new
  commits, and don't merge your own PR without a review.

## Code rules

- **TypeScript everywhere.** No `any` — use `unknown` and narrow it, or define a type.
- **Validate input with Zod.** Every request body and query is checked with a schema before the
  service uses it.
- **Shared things go in `packages/shared`.** If the web app and the API both need a type, enum or
  schema, define it once there.
- **Business logic lives in services**, not in controllers or routes, and never in React
  components.
- **Errors:** in the API, `throw new AppError(status, CODE, message)`. In the web app, catch
  `ApiError` from `lib/api-client.ts`.
- **Database changes:** edit `prisma/schema.prisma`, run `pnpm db:migrate`, give the migration a
  clear name, and commit the generated migration folder. Never edit an old migration.
- **Secrets:** never commit `.env` files, passwords or API keys. Add new variables to
  `.env.example` with a safe example value, and to `src/config/env.ts` in the API.
- **Remove debug code** like `console.log` before pushing.

## Documentation

Update `docs/` in the same PR as the change:

- `docs/api/` — new or changed endpoints (method, URL, request, response, errors)
- `docs/database/` — new tables and why
- `docs/decisions/` — bigger technical choices: what we picked and why
- `docs/screenshots/` — screenshots of finished screens

## Stuck?

Spending more than an hour on one problem? Ask in the team chat or comment on the issue.
Include what you tried and the exact error message.
