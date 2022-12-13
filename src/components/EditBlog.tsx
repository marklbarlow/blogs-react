import 'react-quill/dist/quill.snow.css';

import { Button, Container, Stack, TextField } from '@mui/material';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router';

import { BlogsAPI } from '../apis/BlogsAPI';

export const EditBlog = () => {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    await BlogsAPI.saveBlogEntry(data.title, data.editor, 1);
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <section>
        <form>
          <Stack direction="column" spacing={1}>
            <h1>Create Blog Post</h1>
            <TextField
              fullWidth
              label="Title"
              variant="standard"
              inputProps={register('title', {
                required: true,
              })}
            />
            <Controller
              name="editor"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  {...field}
                  placeholder={'Enter blog text...'}
                  onChange={text => {
                    field.onChange(text);
                  }}
                />
              )}
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button
                color="secondary"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </form>
      </section>
    </Container>
  );
};
