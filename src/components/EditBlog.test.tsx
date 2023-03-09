import { renderWithProviders } from 'tests/utils';
import { describe } from 'vitest';

import { EditBlog } from './EditBlog';

describe('EditBlog', () => {
  it('renders the component', () => {
    renderWithProviders(<EditBlog />);
  });
});
