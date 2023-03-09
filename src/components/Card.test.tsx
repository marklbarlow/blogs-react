import { fireEvent, render, screen } from '@testing-library/react';
import { previews } from 'tests';
import { describe, vi } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('renders the component', () => {
    render(<Card onReadClicked={() => {}} preview={previews[0]} />);

    expect(screen.getByTestId('date')).toHaveTextContent('March 9, 2023');
    expect(screen.getByTestId('title')).toHaveTextContent(previews[0].title);
    expect(screen.getByTestId('preview')).toHaveTextContent(previews[0].text);
  });

  it('handles the button click', () => {
    const handleClick = vi.fn((_: number) => {});
    render(<Card onReadClicked={handleClick} preview={previews[0]} />);

    fireEvent.click(screen.getByText('Read More'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(previews[0].id);
  });
});
