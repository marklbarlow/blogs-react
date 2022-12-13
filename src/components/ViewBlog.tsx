import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import createDOMPurify from 'dompurify';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BlogsAPI } from '../apis/BlogsAPI';
import { BlogComment, BlogEntry, BlogLike, User } from '../model';
import { Comments } from './Comments';
import { Likes } from './Likes';

const DOMPurify = createDOMPurify(window);

function includesUser(likes: BlogLike[], currentUser?: User): boolean {
  return (
    currentUser !== undefined &&
    likes.map(x => x.userId).includes(currentUser.id)
  );
}

export const ViewBlog = () => {
  const { id } = useParams();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [entry, setEntry] = useState<BlogEntry>();
  const [likes, setLikes] = useState<BlogLike[]>([]);

  // To remove
  const user = { id: 1, name: 'John Smith' };

  const userHasLiked = includesUser(likes, user);

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
      if (userHasLiked) {
        setLikes(likes.filter(x => x.userId !== user.id));
        await BlogsAPI.removeLike(entry.id, user.id);
      } else {
        setLikes([
          ...likes,
          { blogEntryId: entry.id, userId: user.id, username: user.name },
        ]);

        await BlogsAPI.addLike(entry.id, user.id);
      }

      await loadBlogLikes(entry.id);
    }
  };

  const onCommentAdded = async (comment: string) => {
    if (entry) {
      await BlogsAPI.addComment(entry.id, comment, user.id);
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
        <Likes
          likes={likes}
          onLikeToggled={onLikeToggled}
          userHasLiked={userHasLiked}
        />
        <Comments comments={comments} onCommentAdded={onCommentAdded} />
      </Container>
    </Box>
  ) : (
    <CircularProgress />
  );
};
