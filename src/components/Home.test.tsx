import { renderWithProviders } from 'tests/utils';
import { describe } from 'vitest';

import { Home } from './Home';

describe('Home', () => {
  it('renders the component', () => {
    renderWithProviders(<Home />);
  });
});