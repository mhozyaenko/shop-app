import {select, call, put} from 'redux-saga/effects';
import {getProduct} from "../api/products";
import {addProduct} from "../products/actions";
import {openNotificationWithIcon} from "../../services/notifications";
import {selectProductById} from "../products/selectors";
import {toggleLoader} from "../app/actions";

export default function* fetchProductSaga(id) {
  const product = yield select(selectProductById(id));

  if (!product) {
    yield put(toggleLoader({data: true}));
    try {
      const data = yield call(getProduct, id);
      yield put(addProduct({data}))
    }
    catch (e) {
      openNotificationWithIcon("error", "OOPS!...", "Something went wrong");
    }
    yield put(toggleLoader({data: false}));
  }
}