import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { comments, entry, likes, previews, users } from 'tests';
import { afterEach, expect } from 'vitest';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

const baseUrl = 'https://blogsapi.azurewebsites.net/Blogs';

export const restHandlers = [
  rest.get(`${baseUrl}/blogs`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(previews));
  }),

  rest.post(`${baseUrl}/blogs`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${baseUrl}/blogs/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(entry));
  }),

  rest.get(`${baseUrl}/blogs/1/comments`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(comments));
  }),

  rest.post(`${baseUrl}/blogs/1/comments`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(`${baseUrl}/blogs/1/likes/999`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${baseUrl}/blogs/1/likes`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(likes));
  }),

  rest.put(`${baseUrl}/blogs/1/likes/999`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${baseUrl}/users`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
