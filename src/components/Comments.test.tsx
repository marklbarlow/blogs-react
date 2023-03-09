import { fireEvent, render, screen } from '@testing-library/react';
import { comments } from 'tests';
import { describe, vi } from 'vitest';

import { Comments } from './Comments';

describe('Comments', () => {
  it('renders the component', () => {
    render(<Comments comments={comments} onCommentAdded={() => {}} />);
  });

  it('handles the comment addition', () => {
    const handleCommentAdded = vi.fn((_: string) => {});
    const comment = 'Here is a new comment';
    render(
      <Comments comments={comments} onCommentAdded={handleCommentAdded} />
    );

    const input = screen.getByPlaceholderText('Add a comment');
    fireEvent.change(input, { target: { value: comment } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleCommentAdded).toHaveBeenCalledTimes(1);
    expect(handleCommentAdded).toHaveBeenCalledWith(comment);
  });
});
