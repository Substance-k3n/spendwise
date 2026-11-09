import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HomePage } from '../src/routes/HomePage';

describe('HomePage', () => {
  it('shows the API status', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      Response.json({ status: 'ok', database: 'up', uptimeSeconds: 1 }),
    );

    render(<HomePage />);

    expect(await screen.findByText('API: ok · Database: up')).toBeInTheDocument();
  });

  it('shows an error when the API is down', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Failed to fetch'));

    render(<HomePage />);

    expect(await screen.findByRole('alert')).toHaveTextContent('API unreachable');
  });
});
