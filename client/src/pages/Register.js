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
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled(Stack)(() => ({
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(to bottom right, #f9f9f9, #eaeaea)`,
  padding: '2rem',
}));


const Card = styled(MuiCard)(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: '#1a1a1a',
  boxShadow: '0 0 20px rgba(0, 970, 255, 0.45)',
  color: '#ffffff',
}));

export default function Register() {
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
      <SignUpContainer>
        <Card>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: '#00bfff', fontWeight: '600' }}
          >
            Sign-up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <FormLabel sx={{ color: '#ccc' }} htmlFor="firstName">First Name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Jon"
                  error={firstNameError}
                  helperText={firstNameErrorMessage}
                  InputProps={{ sx: { color: '#fff' } }}
                  sx={{ input: { backgroundColor: '#2a2a2a' } }}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{ color: '#ccc' }} htmlFor="lastName">Last Name</FormLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Snow"
                  error={lastNameError}
                  helperText={lastNameErrorMessage}
                  InputProps={{ sx: { color: '#fff' } }}
                  sx={{ input: { backgroundColor: '#2a2a2a' } }}
                />
              </FormControl>
            </Stack>

            <FormControl>
              <FormLabel sx={{ color: '#ccc' }} htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                error={emailError}
                helperText={emailErrorMessage}
                InputProps={{ sx: { color: '#fff' } }}
                sx={{ input: { backgroundColor: '#2a2a2a' } }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: '#ccc' }} htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••"
                error={passwordError}
                helperText={passwordErrorMessage}
                InputProps={{ sx: { color: '#fff' } }}
                sx={{ input: { backgroundColor: '#2a2a2a' } }}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: '#00bfff',
                color: '#000',
                fontWeight: '600',
                '&:hover': {
                  backgroundColor: '#00a3cc',
                },
              }}
            >
              Create Account
            </Button>

            <Divider sx={{ borderColor: '#333', mt: 3 }} />

            <Typography sx={{ textAlign: 'center', color: '#aaa', mt: 2 }}>
              Already have an account?{' '}
              <Link href="/login" underline="hover" sx={{ color: '#00bfff' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
