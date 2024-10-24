import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  state: 'failed'
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    show(state, action) {
      state.open = true
      state.message = action.payload.message
      state.state = action.payload.state
    },
    hide(state) {
      state.open = false
    }
  },
});

export const { show, hide } = notificationSlice.actions;
export default notificationSlice.reducer;