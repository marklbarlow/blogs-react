import { Icon, Stack, Tooltip } from '@mui/material';

import { BlogLike, User } from '../model';

export function includesUser(likes: BlogLike[], currentUser?: User): boolean {
  return (
    currentUser !== undefined &&
    likes.map(x => x.userId).includes(currentUser.id)
  );
}

export const Likes = (props: {
  currentUser: User;
  likes: BlogLike[];
  onLikeToggled?: () => void;
}) => {
  const onLikeToggled = () => {
    props.onLikeToggled?.();
  };

  const iconClass = includesUser(props.likes, props.currentUser)
    ? 'material-icons'
    : 'material-icons-outlined';

  const tooltip =
    props.likes.length > 0
      ? `Liked by ${props.likes.map(x => x.username).join(', ')}`
      : '';

  return props.likes ? (
    <Stack direction="row" spacing={1}>
      <Icon baseClassName={iconClass} onClick={onLikeToggled}>
        thumb_up
      </Icon>
      <Tooltip title={tooltip}>
        <span className="counter">{props.likes.length}</span>
      </Tooltip>
    </Stack>
  ) : (
    <div></div>
  );
};
