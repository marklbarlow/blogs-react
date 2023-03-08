import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders the component', () => {
    render(<Avatar username="John Smith" />);
    expect(screen.getByRole('username').textContent).toContain('by John Smith');
  });
});
