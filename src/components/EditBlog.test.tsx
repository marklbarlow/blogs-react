import { screen } from '@testing-library/react';
import { setUsers } from 'features/usersSlice';
import { setupStore } from 'store';
import { renderWithProviders, users } from 'tests';
import { describe } from 'vitest';

import { EditBlog } from './EditBlog';

describe('EditBlog', () => {
  it('renders the component', () => {
    renderWithProviders(<EditBlog />);
  });

  it('allows the user to save a blog entry', async () => {
    const store = setupStore();
    store.dispatch(setUsers({ users }));
    const { container, user } = renderWithProviders(<EditBlog />, { store });

    const title = screen.getByLabelText('Title');
    await user.type(title, 'This is some text');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await user.type(container.querySelector('.ql-editor')!, 'Hello, World!');

    const button = screen.getByText('Save');
    await user.click(button);
  });
});
