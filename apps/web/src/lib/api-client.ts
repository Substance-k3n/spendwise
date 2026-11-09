import { API_PREFIX, type ApiErrorBody } from '@expenseflow/shared';

const baseUrl = `${import.meta.env.VITE_API_URL ?? ''}${API_PREFIX}`;

/** Thrown for any non-2xx response. `code` comes from the API's error body. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * The one place the web app talks to the API. Use it from src/services/*
 * or a feature's api file, never fetch() directly in components.
 */
export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    credentials: 'include',
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  const body: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const error = (body as ApiErrorBody | null)?.error;
    throw new ApiError(res.status, error?.code ?? 'UNKNOWN', error?.message ?? res.statusText);
  }

  return body as T;
}
