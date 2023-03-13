import { screen, waitFor } from '@testing-library/react';
import { setUsers } from 'features/usersSlice';
import { Route, Routes } from 'react-router-dom';
import { setupStore } from 'store';
import { renderWithProviders, users } from 'tests';
import { describe } from 'vitest';

import { ViewBlog } from './ViewBlog';

describe('ViewBlog', () => {
  it('renders the component', () => {
    renderWithProviders(<ViewBlog />);
  });

  it('shows the selected blog entry', async () => {
    const store = setupStore();
    store.dispatch(setUsers({ users }));
    renderWithProviders(
      <Routes>
        <Route path="/view-blog/:id" element={<ViewBlog />} />
      </Routes>,
      {
        initialEntries: ['/view-blog/1'],
        store,
      }
    );

    await waitFor(() => {
      expect(screen.getByTestId('date')).toHaveTextContent('March 13, 2023');
      expect(screen.getByTestId('title')).toHaveTextContent(
        'Proin ac congue lorem, rhoncus'
      );
      expect(screen.getByTestId('text')).toHaveTextContent(
        'Maecenas felis erat, ullamcorper vitae'
      );
    });
  });
});
