# ReqRes Example

A sample repo to demonstrate the ability to call the reqres/api/users endpoint in order to display the returned data within a table.

## Deployment

This project is deployed on netlify [here](https://reqres-example-sun33t.netlify.app/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/sun33t/reqres-example.git
```

Go to the project directory

```bash
  cd reqres-example
```

Install dependencies

```bash
  npm install / yarn
```

Start the server

```bash
  npm run dev / yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`VITE_REQRES_API_BASE_URL=https://reqres.in/api`

## Features

- Display paginated response from /users api query
- Code quality tooling using eslint, prettier, commitizen and conventional-commits, husky, lint-staged
- Styling with TailwindCUI and @tailwindcss/forms adapted to react components
- An example of front end component unit testing with vitest and @testing-library/react
- Search for users by both email address and last name\*
- Update the details for an existing user\*

`*` - Both these features are simluated only as the api does not have a /search endpoint nor do successful patch requests persist on the server.

## Running Tests

To run tests, run the following command

```bash
  npm run test / yarn test
```

## Future Modifications

- employ a global state library (perhaps Zustand) for simplyfing the sharing of state amongst components.
- utilse a form state management library and validation library to validate inputs and make the sharing of form state between components more straight forwards (perhaps react-hook-form and zod)
- utilise zod for runtime validation of api response objects. This would add an additional layer of type safety at runtime beyond that which TypeScript can provide.
- address a11y for each component.
- write more tests for front end components.
- extract some repeated logic into helper functions and unit test.
- add error boundaries
- address responsiveness in the styling
- if the app were to scale, dynamically import components to ensure code splitting and performance gains.
- implement some BDD and cross-browser testing with Playwright.

## Authors

- [@sun33t](https://www.github.com/sun33t)
