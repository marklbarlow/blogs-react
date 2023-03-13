import { ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { BlogsAPI } from './apis';
import { EditBlog, Home, NavBar, ViewBlog } from './components';
import {
  selectAvailableUsers,
  selectSelectedUser,
  selectUser,
  setUsers,
} from './features/usersSlice';
import { User } from './model';
import { theme } from './theme';

import type { SelectChangeEvent } from '@mui/material';
export const App = () => {
  const availableUsers = useAppSelector(selectAvailableUsers);
  const selectedUser = useAppSelector(selectSelectedUser);
  const dispatch = useAppDispatch();

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
    <HashRouter>
      <ThemeProvider theme={theme}>
        <div className="flex flex-col h-full">
          <NavBar
            className="sticky top-0 z-50"
            availableUsers={availableUsers}
            onSelectUser={onSelectUser}
            selectedUser={selectedUser}
          ></NavBar>

          <div className="flex flex-col h-full container mx-auto max-w-4xl relative mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit-blog" element={<EditBlog />} />
              <Route path="/view-blog/:id" element={<ViewBlog />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
