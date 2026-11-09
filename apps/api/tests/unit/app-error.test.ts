import { describe, expect, it } from 'vitest';
import { AppError } from '../../src/utils/app-error';

describe('AppError', () => {
  it('keeps the status code, code and message', () => {
    const error = new AppError(404, 'EXPENSE_NOT_FOUND', 'Expense not found');

    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('EXPENSE_NOT_FOUND');
    expect(error.message).toBe('Expense not found');
  });
});
