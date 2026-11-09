import type { HealthResponse } from '@spendwise/shared';
import { useEffect, useState } from 'react';
import { getHealth } from '../services/health.service';

// Starter page: proves the web app can reach the API and the database.
// Replace it with the real dashboard once that feature exists.
export function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unknown error'));
  }, []);

  return (
    <main className="page">
      <h1>SpendWise</h1>
      {error && <p role="alert">API unreachable: {error}</p>}
      {!error && !health && <p>Checking the API…</p>}
      {health && (
        <p>
          API: {health.status} · Database: {health.database}
        </p>
      )}
    </main>
  );
}
