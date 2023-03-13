import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setUsers } from 'features/usersSlice';
import { Provider } from 'react-redux';
import { setupStore } from 'store';
import { users } from 'tests';
import { describe } from 'vitest';

import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    const store = setupStore();
    store.dispatch(setUsers({ users }));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('renders the component', () => {});

  it('allows the user to select a user', async () => {
    const user = userEvent.setup();

    await user.click(getByRole(screen.getByTestId('user'), 'button'));
    await user.click(screen.getByText('Darth Vader'));
  });

  it('allows the user to create a new entry', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText('Create Blog Entry'));
    expect(screen.getByText('Create Blog Post')).toBeInTheDocument();
  });
});
