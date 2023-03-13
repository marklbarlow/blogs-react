import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from 'tests';
import { describe } from 'vitest';

import { Home } from './Home';

describe('Home', () => {
  it('renders the component', () => {
    renderWithProviders(<Home />);
  });

  it('navigates to the selected article', async () => {
    const { user } = renderWithProviders(<Home />);

    await waitFor(async () => {
      await user.click(screen.getAllByText('Read More')[0]);
    });

    expect(
      screen.getByText('Proin ac congue lorem, rhoncus')
    ).toBeInTheDocument();
  });
});
