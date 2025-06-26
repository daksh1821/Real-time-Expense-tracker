import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux"
import {logout} from '../store/auth'; 

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
  const _logout = () => {
    Cookies.remove("token");
    dispatch(logout());
    window.location.href = "/Login";
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="text-white" to="/">Expenser</Link>
          </Typography>
          {
            isAuthenticated&&(
              <Button color="inherit" onClick={_logout}>Log-Out</Button>
            )
          }
          {
            !isAuthenticated && (
              <>
                <Link to="/Login" className="text-white">
                <Button color="inherit">Login</Button>
                </Link>
                <Link to="/Register" className="text-white">
                <Button color="inherit">Register</Button>
                </Link>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
