import { Icon, Stack } from '@mui/material';

import { BlogLike, User } from '../model';

export function includesUser(likes: BlogLike[], currentUser?: User): boolean {
  return (
    currentUser !== undefined &&
    likes.map(x => x.userId).includes(currentUser.id)
  );
}

export const Likes = (props: { currentUser: User; likes: BlogLike[] }) => {
  const onLikeToggled = () => {};

  const iconClass = includesUser(props.likes, props.currentUser)
    ? 'material-icons'
    : 'material-icons-outlined';

  //   const getFontSet(): string {
  //     return
  //   }

  //   public getTooltip(): string {
  //     return this.likes.length > 0
  //       ? `Liked by ${this.likes.map(x => x.username).join(', ')}`
  //       : '';
  //   }

  return props.likes ? (
    <Stack direction="row" spacing={1}>
      <Icon baseClassName={iconClass}>thumb_up</Icon>
      <span className="counter">{props.likes.length}</span>
    </Stack>
  ) : (
    <div></div>
  );
};
