import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  type: string;
}

const initialState: CounterState = {
  value: 0,
  type: "unknown",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.type = "increment";
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
