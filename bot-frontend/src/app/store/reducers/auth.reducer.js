import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  isAuthenticated: false,
  // email: 'null',
  // token: 'null',
  // isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;