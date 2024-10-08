import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
};

export const incrementSagaFinish = createAction<number>("incrementSagaFinish");
export const decrementSagaFinish = createAction<number>("decrementSagaFinish");

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    incrementSagaStart: (state: CounterState) => {
      state.status = "loading";
    },
    decrementSagaStart: (state: CounterState) => {
      state.status = "loading";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(
        incrementSagaFinish,
        (state: CounterState, action: PayloadAction<number>) => {
          state.status = "idle";
          state.value += action.payload;
        }
      )
      .addCase(
        decrementSagaFinish,
        (state: CounterState, action: PayloadAction<number>) => {
          state.status = "idle";
          state.value -= action.payload;
        }
      );
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  incrementSagaStart,
  decrementSagaStart,
} = counterSlice.actions;

export default counterSlice.reducer;
