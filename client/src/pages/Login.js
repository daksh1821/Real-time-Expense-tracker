import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/auth';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const form = {
      email: data.get('email'),
      password: data.get('password'),
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { token, userExists } = await res.json();
    if (res.ok) {
      Cookies.set('token', token);
      dispatch(getUser(userExists));
      navigate('/');
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at top left, #0f0c29, #302b63, #24243e)'
              : 'linear-gradient(to bottom right, #f9f9f9, #eaeaea)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            maxWidth: 420,
            width: '100%',
            p: 4,
            borderRadius: 4,
            background: theme.palette.background.paper,
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 0 20px rgba(138,43,226,0.4)'
                : '0 0 20px rgba(72,61,139,0.2)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              background: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel>Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                variant="filled"
                error={emailError}
                helperText={emailErrorMessage}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel>Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                variant="filled"
                error={passwordError}
                helperText={passwordErrorMessage}
                fullWidth
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
                color: '#fff',
                fontWeight: 'bold',
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  background: 'linear-gradient(45deg, #7b1fa2, #512da8)',
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Divider sx={{ my: 3, borderColor: '#444' }} />

          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Link href="/register" underline="hover" sx={{ color: '#8e2de2' }}>
              Register
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
