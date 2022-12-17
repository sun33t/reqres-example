/* eslint-disable no-undef */
import { server } from '../mocks/server';
/* @ts-expect-error */
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
/* @ts-expect-error */
afterAll(() => server.close());
/* @ts-expect-error */
afterEach(() => server.resetHandlers());
