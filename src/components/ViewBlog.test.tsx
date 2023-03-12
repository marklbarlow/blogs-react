import { renderWithProviders } from 'tests';
import { describe } from 'vitest';

import { ViewBlog } from './ViewBlog';

describe('ViewBlog', () => {
  it('renders the component', () => {
    renderWithProviders(<ViewBlog />);
  });
});
