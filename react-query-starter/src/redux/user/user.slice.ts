import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../model/user.model";
import { SERVER } from "../../configs/constants";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(`${SERVER}/users`);
  const data = await response.json();
  return data;
});

export interface UserState {
  users: Array<IUser>;
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
