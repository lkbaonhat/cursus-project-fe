// store/slices/editorSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';

const editorSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    clearUsername: (state) => {
      state.username = null;
    },
    setBecomeInstructor: (state, action) => {
      state.becomeInstructor = action.payload;
    },
  },
});


export const { setUsername, clearUsername } = editorSlice.actions;
export default editorSlice.reducer;
