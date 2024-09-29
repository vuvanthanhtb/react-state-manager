import { IAuthLogin } from "@/models/auth.model";
import { loginPending, logout } from "@/redux/user";
import { PayloadAction } from "@reduxjs/toolkit";
import { fork, take } from "redux-saga/effects";

const authorize = (auth: IAuthLogin) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (auth.email === "admin" && auth.password === "admin") {
        localStorage.setItem("token", "token-admin");
        resolve("oke");
      }

      resolve("no thing");
    }, 5000);
  });
};

function* authSaga() {
  while (true) {
    const auth: PayloadAction<IAuthLogin> = yield take(loginPending);
    console.log({ auth });
    yield fork(authorize, auth.payload);
    yield take(logout);
  }
}

export default authSaga;
