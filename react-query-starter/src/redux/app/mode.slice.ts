import { createSlice } from "@reduxjs/toolkit";

export interface IModeState {
  mode: string;
}

const initialState: IModeState = {
  mode: "light",
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;
