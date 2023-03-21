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

export const App = () => {
  const availableUsers = useAppSelector(selectAvailableUsers);
  const selectedUser = useAppSelector(selectSelectedUser);
  const dispatch = useAppDispatch();

  const onSelectUser = (user: User) => {
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
    </HashRouter>
  );
};

export default App;
