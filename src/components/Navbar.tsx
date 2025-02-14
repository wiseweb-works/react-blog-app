import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Box,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuBookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            BLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/dashboard');
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>Dashboard</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/newblog');
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>New Blog</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/about');
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>About</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <MenuBookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            BLOG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate('/dashboard');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Dashboard
            </Button>

            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate('/newblog');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              New Blog
            </Button>

            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate('/about');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              About
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Name" src="/URL" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate('/myblogs');
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>My Blogs</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate('/profile');
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate('/login');
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>Login</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate('/logout');
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
