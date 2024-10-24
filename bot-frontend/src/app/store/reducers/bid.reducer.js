import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urlInfos: []
};

const bidSlice = createSlice({
  name: 'bid',
  initialState,
  reducers: {
    set(state, action) {
      state.urlInfos = action.payload
    },
    add(state, action) {
      state.urlInfos.push(action.payload)
    },
    remove(state, action) {
      state.urlInfos.map((item, idx) => {
        if (item.id === action.payload) {
          state.urlInfos.splice(idx, 1)
        }
        return 0
      })
    },
    edit(state, action) {
      state.urlInfos.map((item, idx) => {
        if (item.id === action.payload.id) {
          state.urlInfos[idx] = action.payload
        }
        return 0
      })
    },
  },
});

export const { set, add, remove, edit } = bidSlice.actions;
export default bidSlice.reducer;