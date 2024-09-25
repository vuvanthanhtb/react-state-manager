import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER } from "../../configs/constants";
import { IBlog, IBlogCreate } from "../../model/blog.model";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await fetch(`${SERVER}/blogs`);
  const data = await response.json();
  return data;
});

export const createNewBlog = createAsyncThunk(
  "blogs/createNewBlog",
  async (payload: IBlogCreate, thunkAPI) => {
    const response = await fetch(`${SERVER}/blogs`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchBlogs());
    }
    return data;
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (payload: IBlog, thunkAPI) => {
    const response = await fetch(`${SERVER}/blogs/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: payload.title,
        author: payload.author,
        content: payload.content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchBlogs());
    }
    return data;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (payload: number, thunkAPI) => {
    const response = await fetch(`${SERVER}/blogs/${payload}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    thunkAPI.dispatch(fetchBlogs());
    return data;
  }
);

export interface IBlogState {
  blogs: Array<IBlog>;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
}

const initialState: IBlogState = {
  blogs: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetCreateSuccess: (state) => {
      state.isCreateSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.isUpdateSuccess = false;
    },
    resetDeleteSuccess: (state) => {
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload || [];
      })
      .addCase(createNewBlog.fulfilled, (state, _) => {
        state.isCreateSuccess = true;
      })
      .addCase(updateBlog.fulfilled, (state, _) => {
        state.isUpdateSuccess = true;
      })
      .addCase(deleteBlog.fulfilled, (state, _) => {
        state.isDeleteSuccess = true;
      });
  },
});

export const { resetCreateSuccess, resetUpdateSuccess, resetDeleteSuccess } =
  blogSlice.actions;

export default blogSlice.reducer;
