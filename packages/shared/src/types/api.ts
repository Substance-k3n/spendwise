/**
 * Shape of every error the API returns. The web app can rely on this
 * for every failed request, so always throw an AppError in the API
 * instead of sending a custom error body.
 */
export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
