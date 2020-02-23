import {select, put, call} from 'redux-saga/effects';
import {openNotificationWithIcon} from "../../services/notifications";
import {selectOrderById} from "../orders/selectors";
import {getOrder} from "../api/order";
import {getOrderByIdSuccess} from "../orders/actions";
import {toggleLoader} from "../app/actions";

export default function* fetchOrderSaga(id) {
  const product = yield select(selectOrderById(id));

  if (!product) {
    yield put(toggleLoader({data: true}));
    try {
      const data = yield call(getOrder, id);
      yield put(getOrderByIdSuccess({data}))
    }
    catch(e) {
      openNotificationWithIcon("error", "OOPS!...", "Something went wrong");
    }
    yield put(toggleLoader({data: false}));
  }
}