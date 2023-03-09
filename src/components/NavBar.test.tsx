import { users } from 'tests';
import { renderWithProviders } from 'tests/utils';
import { describe } from 'vitest';

import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders the component', () => {
    renderWithProviders(
      <NavBar availableUsers={users} onSelectUser={() => {}} />
    );
  });
});
