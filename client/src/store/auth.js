import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    getUser: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { getUser, logout } = authSlice.actions;
export default authSlice.reducer;
