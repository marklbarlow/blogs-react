import { fireEvent, render, screen } from '@testing-library/react';
import { likes } from 'tests';
import { describe, vi } from 'vitest';

import { Likes } from './Likes';

describe('Likes', () => {
  it('renders the component', () => {
    render(
      <Likes likes={likes} onLikeToggled={() => {}} userHasLiked={true} />
    );

    expect(screen.getByTestId('icon')).toHaveClass('material-icons');

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveTextContent(`${likes.length}`);
    expect(tooltip).toHaveAccessibleName('Liked by John Smith, John Snow');
  });

  it(`handles a 'liked' toggle`, () => {
    const handleClick = vi.fn();
    render(
      <Likes likes={likes} onLikeToggled={handleClick} userHasLiked={true} />
    );

    fireEvent.click(screen.getByTestId('icon'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows an outlined icon if not liked by user', () => {
    render(
      <Likes likes={likes} onLikeToggled={() => {}} userHasLiked={false} />
    );

    expect(screen.getByTestId('icon')).toHaveClass('material-icons-outlined');
  });

  it('has empty tooltip if not liked', () => {
    render(<Likes likes={[]} onLikeToggled={() => {}} userHasLiked={true} />);

    expect(screen.getByTestId('tooltip')).toHaveAccessibleName('');
  });
});
