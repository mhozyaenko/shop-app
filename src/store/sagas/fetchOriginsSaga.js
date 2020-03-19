import {call, put} from 'redux-saga/effects'
import {getOrigins} from "../api/products";
import {getOriginsSuccess} from "../products/actions";

export default function* fetchOriginsSaga() {
  try {
    const data = yield call(getOrigins);
    yield put(getOriginsSuccess(data))
  }
  catch (e) {
    console.log(e);
  }
}