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
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!firstName.value.trim()) {
      setFirstNameError(true);
      setFirstNameErrorMessage('First name is required.');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    if (!lastName.value.trim()) {
      setLastNameError(true);
      setLastNameErrorMessage('Last name is required.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const form = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        navigate('/login');
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
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
            maxWidth: 500,
            width: '100%',
            p: 4,
            borderRadius: 4,
            background: theme.palette.background.paper,
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 0 20px rgba(138,43,226,0.4)'
                : '0 0 20px rgba(72,61,139,0.3)',
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
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <FormLabel>First Name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Jon"
                  error={firstNameError}
                  helperText={firstNameErrorMessage}
                  variant="filled"
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Last Name</FormLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Snow"
                  error={lastNameError}
                  helperText={lastNameErrorMessage}
                  variant="filled"
                />
              </FormControl>
            </Stack>

            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                error={emailError}
                helperText={emailErrorMessage}
                variant="filled"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••"
                error={passwordError}
                helperText={passwordErrorMessage}
                variant="filled"
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                background: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': {
                  transform: 'scale(1.05)',
                  background: 'linear-gradient(45deg, #7b1fa2, #512da8)',
                },
              }}
            >
              Register
            </Button>

            <Divider sx={{ my: 3, borderColor: '#444' }} />

            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
              <Link href="/login" underline="hover" sx={{ color: '#8e2de2' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
