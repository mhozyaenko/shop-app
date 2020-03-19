import {call, put} from 'redux-saga/effects';
import {getOrdersList} from "../api/order";
import {normalize} from "../../helpers";
import {getOrdersSuccess} from "../orders/actions";
import {toggleLoader} from "../app/actions";

export default function* fetchOrdersListSaga() {
  yield put(toggleLoader({data: true}));

  try{
    const data = yield call(getOrdersList);
    yield put(getOrdersSuccess(normalize(data.items)));
  }
  catch(e) {
    console.log(e)
  }

  yield put(toggleLoader({data: false}))
}