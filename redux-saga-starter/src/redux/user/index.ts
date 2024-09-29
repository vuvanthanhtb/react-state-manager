import { IAuthLogin } from "./../../models/auth.model";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserCreate } from "@/models/user.model";

export interface UserState {
  isPending: boolean;
  isError: boolean;
  data: any;
  errors: any;

  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
}

const initialState: UserState = {
  isPending: false,
  isError: false,
  data: [],
  errors: [],

  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const loginPending = createAction<IAuthLogin>("loginPending");
export const logout = createAction("logout");

export const fetchUsersPending = createAction("fetchUsersPending");
export const fetchUsersSuccess = createAction<IUser[]>("fetchUsersSuccess");
export const fetchUsersFailed = createAction("fetchUsersFailed");

export const createUserPending = createAction<IUserCreate>("createUserPending");
export const createUserSuccess = createAction("createUserSuccess");
export const createUserFailed = createAction("createUserFailed");

export const updateUserPending = createAction<IUser>("updateUserPending");
export const updateUserSuccess = createAction("updateUserSuccess");
export const updateUserFailed = createAction("updateUserFailed");

export const deleteUserPending = createAction<number>("deleteUserPending");
export const deleteUserSuccess = createAction("deleteUserSuccess");
export const deleteUserFailed = createAction("deleteUserFailed");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersPending, (state: UserState) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(
        fetchUsersSuccess,
        (state: UserState, action: PayloadAction<IUser[]>) => {
          state.isPending = false;
          state.isError = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUsersFailed, (state: UserState) => {
        state.isPending = false;
        state.isError = true;
        state.data = [];
        state.isCreateSuccess = false;
      })
      .addCase(createUserPending, (state: UserState) => {
        state.isPending = true;
        state.isError = false;
        state.isCreateSuccess = false;
      })
      .addCase(createUserSuccess, (state: UserState) => {
        state.isPending = false;
        state.isError = false;
        state.isCreateSuccess = true;
      })
      .addCase(createUserFailed, (state: UserState) => {
        state.isPending = false;
        state.isError = true;
        state.data = [];
        state.isCreateSuccess = false;
      })
      .addCase(updateUserPending, (state: UserState) => {
        state.isPending = true;
        state.isError = false;
        state.isUpdateSuccess = false;
      })
      .addCase(updateUserSuccess, (state: UserState) => {
        state.isPending = false;
        state.isError = false;
        state.isUpdateSuccess = true;
      })
      .addCase(updateUserFailed, (state: UserState) => {
        state.isPending = false;
        state.isError = true;
        state.data = [];
        state.isUpdateSuccess = false;
      })
      .addCase(deleteUserPending, (state: UserState) => {
        state.isPending = true;
        state.isError = false;
        state.isDeleteSuccess = false;
      })
      .addCase(deleteUserSuccess, (state: UserState) => {
        state.isPending = false;
        state.isError = false;
        state.isDeleteSuccess = true;
      })
      .addCase(deleteUserFailed, (state: UserState) => {
        state.isPending = false;
        state.isError = true;
        state.data = [];
        state.isDeleteSuccess = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
