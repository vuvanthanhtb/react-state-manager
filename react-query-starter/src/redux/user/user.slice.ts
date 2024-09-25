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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload: IUser, thunkAPI) => {
    const response = await fetch(`${SERVER}/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
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
  isUpdateSuccess: boolean;
}

const initialState: IUserState = {
  users: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateSuccess: (state) => {
      state.isCreateSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.isUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state, _) => {
      state.isCreateSuccess = true;
    });
    builder.addCase(updateUser.fulfilled, (state, _) => {
      state.isUpdateSuccess = true;
    });
  },
});

export const { resetCreateSuccess, resetUpdateSuccess } = userSlice.actions;

export default userSlice.reducer;
