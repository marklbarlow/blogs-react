import 'react-quill/dist/quill.snow.css';

import { Button, Container, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router';

export const EditBlog = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const onSave = () => {
    console.log('Saved!');
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <section>
        <Stack direction="column" spacing={1}>
          <h1>Create Blog Post</h1>
          <TextField fullWidth label="Title" variant="standard" />
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <Stack direction="row" justifyContent="flex-end">
            <Button color="secondary" variant="contained" onClick={onSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      </section>
    </Container>
  );
};
