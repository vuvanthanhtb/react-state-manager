import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { SERVER } from "@/configs/env.constants";
import { IBlog, IBlogCreate } from "@/models/blog.model";
import {
  fetchBlogsSuccess,
  createBlogSuccess,
  deleteBlogSuccess,
  fetchBlogsPending,
  createBlogPending,
  deleteBlogPending,
  updateBlogSuccess,
  updateBlogPending,
  deleteBlogFailed,
  updateBlogFailed,
  createBlogFailed,
  fetchBlogsFailed,
} from "@/redux/blog";

const fetchBlogs = async () => {
  const result = await fetch(`${SERVER}/blogs`);
  return result.json();
};

const createBlog = async (payload: IBlogCreate) => {
  const res = await fetch(`${SERVER}/blogs`, {
    method: "POST",
    body: JSON.stringify({
      title: payload.title,
      author: payload.author,
      content: payload.content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const updateBlog = async (payload: IBlog) => {
  const res = await fetch(`${SERVER}/blogs/${payload.id}`, {
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

  return res.json();
};

const deleteBlog = async (payload: number) => {
  const result = await fetch(`${SERVER}/blogs/${payload}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
};

function* handleFetchBlogs() {
  try {
    const blogs: IBlog[] = yield call(fetchBlogs);
    yield put(fetchBlogsSuccess(blogs));
  } catch (error) {
    yield put(fetchBlogsFailed());
  }
}

function* handleCreateBlog(action: PayloadAction<IBlogCreate>) {
  try {
    yield call(createBlog, action.payload);
    yield put(createBlogSuccess());
  } catch (error) {
    yield put(createBlogFailed());
  }
}

function* handleUpdateBlog(action: PayloadAction<IBlog>) {
  try {
    yield call(updateBlog, action.payload);
    yield put(updateBlogSuccess());
  } catch (error) {
    yield put(updateBlogFailed());
  }
}

function* handleDeleteBlog(action: PayloadAction<number>) {
  try {
    yield call(deleteBlog, action.payload);
    yield put(deleteBlogSuccess());
  } catch (error) {
    yield put(deleteBlogFailed());
  }
}

function* blogSaga() {
  yield takeEvery(fetchBlogsPending, handleFetchBlogs);
  yield takeEvery(createBlogPending, handleCreateBlog);
  yield takeEvery(updateBlogPending, handleUpdateBlog);
  yield takeEvery(deleteBlogPending, handleDeleteBlog);
}

export default blogSaga;
