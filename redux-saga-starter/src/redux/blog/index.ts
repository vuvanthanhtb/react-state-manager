import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog, IBlogCreate } from "@/models/blog.model";

export interface BlogState {
  isPending: boolean;
  isError: boolean;
  data: any;
  errors: any;

  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
}

const initialState: BlogState = {
  isPending: false,
  isError: false,
  data: [],
  errors: [],

  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const fetchBlogsPending = createAction("fetchBlogsPending");
export const fetchBlogsSuccess = createAction<IBlog[]>("fetchBlogsSuccess");
export const fetchBlogsFailed = createAction("fetchBlogsFailed");

export const createBlogPending = createAction<IBlogCreate>("createBlogPending");
export const createBlogSuccess = createAction("createBlogSuccess");
export const createBlogFailed = createAction("createBlogFailed");

export const updateBlogPending = createAction<IBlog>("updateBlogPending");
export const updateBlogSuccess = createAction("updateBlogSuccess");
export const updateBlogFailed = createAction("updateBlogFailed");

export const deleteBlogPending = createAction<number>("deleteBlogPending");
export const deleteBlogSuccess = createAction("deleteBlogSuccess");
export const deleteBlogFailed = createAction("deleteBlogFailed");

export const userSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsPending, (state: BlogState) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(
        fetchBlogsSuccess,
        (state: BlogState, action: PayloadAction<IBlog[]>) => {
          state.isPending = false;
          state.isError = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchBlogsFailed, (state: BlogState) => {
        state.isPending = false;
        state.isError = true;
        state.data = [];
        state.isCreateSuccess = false;
      })
      .addCase(createBlogPending, (state: BlogState) => {
        state.isPending = true;
        state.isError = false;
        state.isCreateSuccess = false;
      })
      .addCase(createBlogSuccess, (state: BlogState) => {
        state.isPending = false;
        state.isError = false;
        state.isCreateSuccess = true;
      })
      .addCase(createBlogFailed, (state: BlogState) => {
        state.isPending = false;
        state.isError = true;
        state.data = [];
        state.isCreateSuccess = false;
      })
      .addCase(updateBlogPending, (state: BlogState) => {
        state.isPending = true;
        state.isError = false;
        state.isUpdateSuccess = false;
      })
      .addCase(updateBlogSuccess, (state: BlogState) => {
        state.isPending = false;
        state.isError = false;
        state.isUpdateSuccess = true;
      })
      .addCase(updateBlogFailed, (state: BlogState) => {
        state.isPending = false;
        state.isError = true;
        state.data = [];
        state.isUpdateSuccess = false;
      })
      .addCase(deleteBlogPending, (state: BlogState) => {
        state.isPending = true;
        state.isError = false;
        state.isDeleteSuccess = false;
      })
      .addCase(deleteBlogSuccess, (state: BlogState) => {
        state.isPending = false;
        state.isError = false;
        state.isDeleteSuccess = true;
      })
      .addCase(deleteBlogFailed, (state: BlogState) => {
        state.isPending = false;
        state.isError = true;
        state.data = [];
        state.isDeleteSuccess = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
