import { call, put, takeEvery } from "redux-saga/effects";
import {
  createUserFailed,
  createUserPending,
  createUserSuccess,
  deleteUserFailed,
  deleteUserPending,
  deleteUserSuccess,
  fetchUsersFailed,
  fetchUsersPending,
  fetchUsersSuccess,
  updateUserFailed,
  updateUserPending,
  updateUserSuccess,
} from "@/redux/user";
import { SERVER } from "@/configs/env.constants";
import { IUser, IUserCreate } from "@/models/user.model";
import { PayloadAction } from "@reduxjs/toolkit";

const fetchUsers = async () => {
  const result = await fetch(`${SERVER}/users`);
  return result.json();
};

const createUser = async (payload: IUserCreate) => {
  const res = await fetch(`${SERVER}/users`, {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      name: payload.name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const updateUser = async (payload: IUser) => {
  const res = await fetch(`${SERVER}/users/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify({
      email: payload.email,
      name: payload.name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const deleteUser = async (payload: number) => {
  const result = await fetch(`${SERVER}/users/${payload}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
};

function* handleFetchUser() {
  console.log(">>> handleFetchUser");
  try {
    const users: IUser[] = yield call(fetchUsers);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailed());
  }
}

function* handleCreateUser(action: PayloadAction<IUserCreate>) {
  console.log(">>> handleCreateUser");
  try {
    yield call(createUser, action.payload);
    yield put(createUserSuccess());
  } catch (error) {
    yield put(createUserFailed());
  }
}

function* handleUpdateUser(action: PayloadAction<IUser>) {
  console.log(">>> handleUpdateUser");
  try {
    yield call(updateUser, action.payload);
    yield put(updateUserSuccess());
  } catch (error) {
    yield put(updateUserFailed());
  }
}

function* handleDeleteUser(action: PayloadAction<number>) {
  console.log(">>> handleDeleteUser");
  try {
    yield call(deleteUser, action.payload);
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(deleteUserFailed());
  }
}

function* userSaga() {
  console.log(">>> user saga");
  yield takeEvery(fetchUsersPending, handleFetchUser);
  yield takeEvery(createUserPending, handleCreateUser);
  yield takeEvery(updateUserPending, handleUpdateUser);
  yield takeEvery(deleteUserPending, handleDeleteUser);
}

export default userSaga;
