import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserCreate } from "../../model/user.model";
import { SERVER } from "../../configs/constants";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(`${SERVER}/users`);
  const data = await response.json();
  return data;
});

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (payload: IUserCreate, thunkAPI) => {
    const response = await fetch(`${SERVER}/users`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchUsers());
    }
    return data;
  }
);

export interface IUserState {
  users: Array<IUser>;
  isCreateSuccess: boolean;
}

const initialState: IUserState = {
  users: [],
  isCreateSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateSuccess: (state) => {
      state.isCreateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.isCreateSuccess = true;
    });
  },
});

export const { resetCreateSuccess } = userSlice.actions;

export default userSlice.reducer;
