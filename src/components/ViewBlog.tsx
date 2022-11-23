import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import createDOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BlogsAPI } from '../apis/BlogsAPI';
import { BlogComment, BlogEntry, BlogLike, User } from '../model';
import { Comments } from './Comments';
import { Likes } from './Likes';

const DOMPurify = createDOMPurify(window);

export const ViewBlog = () => {
  const { id } = useParams();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [entry, setEntry] = useState<BlogEntry>();
  const [likes, setLikes] = useState<BlogLike[]>([]);

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id);
      (async () => {
        setEntry(await BlogsAPI.loadBlogEntry(idAsNumber));
        setComments(await BlogsAPI.loadBlogComments(idAsNumber));
        setLikes(await BlogsAPI.loadBlogLikes(idAsNumber));
      })();
    }
  }, [id]);

  const user: User = { id: 1, name: 'John Smith' };

  return entry ? (
    <Box sx={{ marginTop: '32px' }}>
      <Container maxWidth="md">
        <span className="date">
          {format(new Date(entry.timestamp), 'EEEE, MMMM d, y')}
        </span>

        <h1>{entry.title}</h1>

        <article>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(entry.text),
            }}
          ></div>
        </article>
        <Likes currentUser={user} likes={likes} />
        <Comments comments={comments} />
      </Container>
    </Box>
  ) : (
    <CircularProgress />
  );
};
