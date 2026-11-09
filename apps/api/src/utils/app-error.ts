/**
 * Throw this from any service or controller to send a clean error response,
 * e.g. `throw new AppError(404, 'EXPENSE_NOT_FOUND', 'Expense not found')`.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
