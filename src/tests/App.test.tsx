import { expect, it } from 'vitest';
import App from '../App';
import { response } from '../mocks/handlers';
import { render, screen, userEvent, waitFor } from '../utils/test-utils';

// initial test for confirming that vitest + testing-library are configured correctly
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
      screen.getByTestId(`${user?.first_name} ${user?.last_name}`)
    ).toBeDefined();
  });
});

it('should show only the valid search result when searching via email address', async () => {
  const user = userEvent.setup();
  render(<App />);

  // wait for page to finish loading
  await waitFor(() => {
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  // ensure that the email option is selected from the search type select
  await user.selectOptions(screen.getByTestId('searchType'), 'email');

  // test for presence of input and confirm that value has been entered correctly.
  expect(screen.getByTestId('searchInput')).toBeDefined();
  await user.type(screen.getByTestId('searchInput'), 'eve.holt@reqres.in');
  expect(screen.getByTestId('searchInput')).toHaveValue('eve.holt@reqres.in');

  // test for presence of search button
  expect(screen.getByRole('button', { name: 'Search' })).toBeDefined();

  // click search button
  await user.click(screen.getByRole('button', { name: 'Search' }));

  waitFor(() => {
    expect(screen.getByText('Search Results')).toBeDefined();
  });

  // test for the prescence of only the searched for user
  response?.data?.forEach((user) => {
    if (user?.email === 'eve.holt@reqres.in') {
      expect(screen.getByText(user.email)).toBeDefined();
    } else {
      expect(screen.queryByText(user.email)).toBeNull();
    }
  });
});

it('should show only the valid search result when searching via last name', async () => {
  const user = userEvent.setup();
  render(<App />);

  // wait for page to finish loading
  await waitFor(() => {
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  // test for presence of search type select
  expect(screen.getByTestId('searchType')).toBeDefined();

  // change option to search by last_name
  await user.selectOptions(screen.getByTestId('searchType'), 'last_name');

  // onfirm that value has been entered correctly.
  await user.type(screen.getByTestId('searchInput'), 'holt');
  expect(screen.getByTestId('searchInput')).toHaveValue('holt');

  // click search button
  await user.click(screen.getByRole('button', { name: 'Search' }));

  waitFor(() => {
    expect(screen.getByText('Search Results')).toBeDefined();
  });

  // test for the prescence of only the searched for user
  response?.data?.forEach((user) => {
    if (user?.last_name === 'Holt') {
      expect(screen.getByText(user.last_name)).toBeDefined();
    } else {
      expect(screen.queryByText(user.last_name)).toBeNull();
    }
  });
});
