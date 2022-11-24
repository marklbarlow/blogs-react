import './Comments.css';

import { Stack } from '@mui/material';
import { format } from 'date-fns';

import { BlogComment } from '../model';

export const Comments = (props: {
  comments: BlogComment[];
  onCommentAdded?: (comment: string) => void;
}) => {
  const renderedComments = props.comments?.map(comment => (
    <Stack key={comment.id}>
      <Stack className="comment">
        <span className="user">{comment.username}</span>
        <span>{comment.text}</span>
      </Stack>

      <small className="indent">
        <span className="date">
          {format(new Date(comment.timestamp), 'MMMM d, y')} at{' '}
          {format(new Date(comment.timestamp), 'h:mm a')}
        </span>
      </small>
    </Stack>
  ));

  return <Stack spacing={1}>{renderedComments}</Stack>;
};
