import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';

import { BlogsAPI } from './apis/BlogsAPI';
import { BlogPreview } from './model';

export const Home = () => {
  const [previews, setPreviews] = useState<BlogPreview[]>([]);

  useEffect(() => {
    const fetchData = async () =>
      setPreviews(await BlogsAPI.loadBlogPreviews(5));
    fetchData();
  }, []);

  const items = previews.map(preview => (
    <ListItem disablePadding key={preview.id}>
      <ListItemButton component="a" href={`/view-blog/${preview.id}`}>
        <ListItemText primary={preview.title} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <section>
      <h1>Read the latest blog entries!</h1>

      <List>{items}</List>
    </section>
  );
};
