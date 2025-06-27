import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth';
import { useCustomTheme } from '../ThemeContext'; // 👈 Make sure ThemeContext.js exists and is used in index.js

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { toggleTheme, mode } = useCustomTheme(); // 👈 Get theme state and toggler

  const _logout = () => {
    Cookies.remove('token');
    dispatch(logout());
    window.location.href = '/Login';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ px: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="text-white" to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Expenser
            </Link>
          </Typography>

          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {isAuthenticated ? (
            <Button color="inherit" onClick={_logout}>
              Log-Out
            </Button>
          ) : (
            <>
              <Link to="/Login" className="text-white" style={{ textDecoration: 'none' }}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/Register" className="text-white" style={{ textDecoration: 'none' }}>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
