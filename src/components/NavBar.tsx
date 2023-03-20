import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { User } from '../model';

import type { SelectChangeEvent } from '@mui/material';
export const NavBar = ({
  availableUsers,
  className,
  onSelectUser,
  selectedUser,
}: {
  availableUsers: User[];
  className?: string;
  onSelectUser: (event: SelectChangeEvent) => void;
  selectedUser?: User;
}) => {
  const navigate = useNavigate();

  const onEditBlog = () => {
    navigate(`/edit-blog`);
  };

  return (
    <div
      className={`${
        className ?? ''
      } flex flex-row items-center gap-2 px-4 backdrop-blur border-b border-slate-900/10`}
    >
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Blog
      </Typography>

      <button
        className="btn btn-blue"
        type="button"
        onClick={() => onEditBlog()}
      >
        Create Blog Entry
      </button>
      <span className="flex-auto"></span>
      <span>Impersonating user:</span>
      <FormControl>
        <Select
          data-testid="user"
          variant="filled"
          key={selectedUser?.id}
          value={selectedUser ? JSON.stringify(selectedUser) : ''}
          label="User"
          onChange={onSelectUser}
        >
          {availableUsers.map(user => (
            <MenuItem key={user.id} value={JSON.stringify(user)}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button
        className="btn btn-blue"
        onClick={() =>
          (location.href =
            'https://victorious-tree-0f7138003.2.azurestaticapps.net')
        }
      >
        View Angular Version
      </button>
    </div>
  );
};
