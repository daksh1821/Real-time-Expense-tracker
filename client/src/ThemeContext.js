// src/ThemeContext.js
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useCustomTheme = () => useContext(ThemeContext);

export const ThemeWrapper = ({ children }) => {
  const [mode, setMode] = useState('dark'); // default to dark mode

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'dark' ? '#0d0d0d' : '#f5f5f5',
            paper: mode === 'dark' ? '#1a1a1a' : '#ffffff',
          },
          primary: {
            main: mode === 'dark' ? '#8e2de2' : '#673ab7',
          },
          secondary: {
            main: mode === 'dark' ? '#4a00e0' : '#03a9f4',
          },
          text: {
            primary: mode === 'dark' ? '#ffffff' : '#000000',
          },
        },
        typography: {
          fontFamily: 'Poppins, sans-serif',
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
