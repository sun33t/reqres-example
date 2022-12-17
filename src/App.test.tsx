import { expect, it } from 'vitest';
import App from './App';
import { render, screen } from './utils/test-utils';

it('should contain a heading with "API Fetch Example"', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /API Fetch Example/i, level: 1 }));
});
