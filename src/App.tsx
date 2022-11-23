import './App.css';

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { EditBlog, Home, ViewBlog } from './components';
import { theme } from './theme';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Blog
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Button href="/edit-blog" color="secondary" variant="contained">
                  Create Blog Entry
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  href="https://victorious-tree-0f7138003.2.azurestaticapps.net"
                  color="secondary"
                  variant="contained"
                >
                  View Angular Version
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box m={2}>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-blog" element={<EditBlog />} />
            <Route path="/view-blog/:id" element={<ViewBlog />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
