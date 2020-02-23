import {select, getContext, call, put} from 'redux-saga/effects';
import {selectCartEntities, selectCartIds} from "../cart/selectors";
import {postOrder} from "../api/order";
import {clearCart} from "../cart/actions";
import {openNotificationWithIcon} from "../../services/notifications";
import {toggleLoader} from "../app/actions";

export default function* postOrderSaga() {
  const cartIds = yield select(selectCartIds);
  const cartItems = yield select(selectCartEntities);
  const data = {
    order: {
      pieces: cartIds.map(item =>
        ({productId: item, count: cartItems[item].count}))
    }
  };
  const history = yield getContext('history');

  yield put(toggleLoader({data: true}));
  try {
    const response = yield call(postOrder, data);
    yield put(clearCart());
    history.replace(`/orders/${response.id}`)
  }
  catch (e) {
    openNotificationWithIcon("error", "OOPS!...", "Something went wrong");
  }
  yield put(toggleLoader({data: false}));
}