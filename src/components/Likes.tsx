import { Icon, Tooltip } from '@mui/material';

import { BlogLike } from '../model';

export const Likes = ({
  likes,
  onLikeToggled,
  userHasLiked,
}: {
  likes: BlogLike[];
  onLikeToggled: () => void;
  userHasLiked: boolean;
}) => {
  const iconClass = userHasLiked ? 'material-icons' : 'material-icons-outlined';

  const tooltip =
    likes.length > 0 ? `Liked by ${likes.map(x => x.username).join(', ')}` : '';

  return (
    likes && (
      <div className="flex gap-2">
        <Icon
          data-testid="icon"
          className="cursor-pointer"
          baseClassName={iconClass}
          onClick={onLikeToggled}
        >
          thumb_up
        </Icon>
        <Tooltip data-testid="tooltip" title={tooltip}>
          <span className="mt-1">{likes.length}</span>
        </Tooltip>
      </div>
    )
  );
};
