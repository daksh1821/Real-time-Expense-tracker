import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  RouterProvider
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import router from './routes.js';
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeWrapper } from './ThemeContext';

// ✅ Import MUI theme utilities
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// ✅ Define custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0d0d0d',
      paper: '#1a1a1a',
    },
    primary: {
      main: '#8e2de2',
    },
    secondary: {
      main: '#4a00e0',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <Provider store={store}>
      <ThemeWrapper>
            <RouterProvider router={router} />
      </ThemeWrapper>
    </Provider>
);

reportWebVitals();
