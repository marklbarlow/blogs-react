import './App.css';

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BlogsAPI } from './apis';
import { EditBlog, Home, ViewBlog } from './components';
import {
  selectAvailableUsers,
  selectSelectedUser,
  selectUser,
  setUsers,
} from './features/usersSlice';
import { User } from './model';
import { theme } from './theme';

export const App = () => {
  const availableUsers = useSelector(selectAvailableUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const dispatch = useDispatch();

  const onSelectUser = (event: SelectChangeEvent) => {
    const user = JSON.parse(event.target.value) as User;
    dispatch(selectUser({ user }));
  };

  useEffect(() => {
    (async () => {
      const users = await BlogsAPI.loadUsers();
      dispatch(setUsers({ users }));
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="flex flex-col h-full">
          <div className="flex flex-row items-center gap-2 px-4 bg-[#3F51B5] text-white">
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

            <Button href="/edit-blog" color="secondary" variant="contained">
              Create Blog Entry
            </Button>
            <span className="flex-auto"></span>
            <span>Impersonating user:</span>
            <FormControl>
              <Select
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

            <Button
              href="https://victorious-tree-0f7138003.2.azurestaticapps.net"
              color="secondary"
              variant="contained"
            >
              View Angular Version
            </Button>
          </div>

          <div className="flex flex-col h-full container mx-auto max-w-4xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit-blog" element={<EditBlog />} />
              <Route path="/view-blog/:id" element={<ViewBlog />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
