import { screen } from '@testing-library/react';
import { setUsers } from 'features/usersSlice';
import { setupStore } from 'store';
import { renderWithProviders, users } from 'tests';
import { describe, vi } from 'vitest';

import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders the component', () => {
    renderWithProviders(
      <NavBar availableUsers={users} onSelectUser={() => {}} />
    );
  });

  it('allows the user to select a user', async () => {
    const handleClick = vi.fn();
    const store = setupStore();
    store.dispatch(setUsers({ users }));

    const { user } = renderWithProviders(
      <NavBar availableUsers={users} onSelectUser={handleClick} />,
      { store }
    );

    await user.selectOptions(
      screen.getByTestId('user'),
      screen.getByRole('option', { name: 'Darth Vader' })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
