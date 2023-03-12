import { renderWithProviders, users } from 'tests';
import { describe } from 'vitest';

import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders the component', () => {
    renderWithProviders(
      <NavBar availableUsers={users} onSelectUser={() => {}} />
    );
  });
});
