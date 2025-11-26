import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CheckAuth from './utils/CheckAuth';
import  Guest from './utils/Guest';
import { CircularProgress, Box } from '@mui/material';

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));

// Loading component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

export default createBrowserRouter([
    {
      element: <App/>,
      children: [
        {
          path: "/",
          element:(
            <Suspense fallback={<LoadingFallback />}>
              <CheckAuth>
                <Home/>
              </CheckAuth>
            </Suspense>
          ),
        },
        {
          path: "/Login",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Guest>
                <Login/>
              </Guest>
            </Suspense>
          ),
        },
        {
          path: "/Register",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Guest>
                <Register/>
              </Guest>
            </Suspense>
          )
        },
      ],
    },
  ]);