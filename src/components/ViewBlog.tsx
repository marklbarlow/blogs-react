import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import createDOMPurify from 'dompurify';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BlogsAPI } from '../apis/BlogsAPI';
import { BlogComment, BlogEntry, BlogLike, User } from '../model';
import { Comments } from './Comments';
import { includesUser, Likes } from './Likes';

const DOMPurify = createDOMPurify(window);

export const ViewBlog = () => {
  const { id } = useParams();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [entry, setEntry] = useState<BlogEntry>();
  const [likes, setLikes] = useState<BlogLike[]>([]);

  const loadBlogComments = useCallback(
    async (id: number) => setComments(await BlogsAPI.loadBlogComments(id)),
    []
  );

  const loadBlogLikes = useCallback(
    async (id: number) => setLikes(await BlogsAPI.loadBlogLikes(id)),
    []
  );

  const onLikeToggled = async () => {
    if (entry) {
      if (includesUser(likes, { id: 1 } as User)) {
        await BlogsAPI.removeLike(entry.id, 1);
      } else {
        await BlogsAPI.addLike(entry.id, 1);
      }

      await loadBlogLikes(entry.id);
    }
  };

  const onCommentAdded = async (comment: string) => {
    if (entry) {
      console.log('comment!', comment);
      await loadBlogComments(entry.id);
    }
  };

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id);
      (async () => {
        setEntry(await BlogsAPI.loadBlogEntry(idAsNumber));
        await loadBlogComments(idAsNumber);
        await loadBlogLikes(idAsNumber);
      })();
    }
  }, [id, loadBlogComments, loadBlogLikes]);

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
        <Likes currentUser={user} likes={likes} onLikeToggled={onLikeToggled} />
        <Comments comments={comments} onCommentAdded={onCommentAdded} />
      </Container>
    </Box>
  ) : (
    <CircularProgress />
  );
};
