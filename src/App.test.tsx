import { expect, it } from 'vitest';
import App from './App';
import { response } from './mocks/handlers';
import { render, screen, waitFor } from './utils/test-utils';

it('should contain a heading with "API Fetch Example"', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /API Fetch Example/i, level: 1 }));
});

it('should load user data upon page load', async () => {
  render(<App />);
  await waitFor(() => {
    expect(
      screen.queryByRole('heading', { name: /loading.../i, level: 2 })
    ).toBeDefined();
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  response?.data?.forEach((user) => {
    expect(
      screen.getByRole('heading', {
        name: `${user?.first_name} ${user?.last_name}`,
      })
    ).toBeDefined();
  });
});
