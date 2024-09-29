import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  decrementSagaFinish,
  incrementSagaFinish,
} from "@/redux/counter/counter.slide";

function* handleIncrement(action: PayloadAction) {
  console.log(">>> check handleIncrement", action);
  yield delay(0.1 * 1000);
  yield put(incrementSagaFinish(2));
}

function* handleDecrement(action: PayloadAction) {
  console.log(">>> check handleDecrement", action);
  // yield put({ type: "counter/decrementSagaFinish", payload: 2 });
  yield put(decrementSagaFinish(2));
}

function* counterSaga() {
  console.log(">>> counter saga");
  yield takeLatest("counter/incrementSagaStart", handleIncrement);
  yield takeLeading("counter/decrementSagaStart", handleDecrement);
}

export default counterSaga;
