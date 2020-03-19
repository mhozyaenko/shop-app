import {getContext, call, put, select, delay} from 'redux-saga/effects';
import {selectFilters, selectFiltersEditable} from "../filters/selectors";
import {filtersToString, normalize} from "../../helpers";
import {getProducts} from "../api/products";
import {setPagination} from "../filters/action";
import {getProductsSuccess} from "../products/actions";
import {toggleLoader} from "../app/actions";
import {openNotificationWithIcon} from "../../services/notifications";

export default function* fetchProductsListSaga(delayTime) {
  const filter = yield select(selectFilters);
  const queryString = filtersToString(filter);
  const withAuth = yield select(selectFiltersEditable);
  const history = yield getContext('history');

  yield put(toggleLoader({data: true}));

  yield delay(delayTime);

  try {
    const data = yield call(getProducts, queryString, withAuth);
    yield put(getProductsSuccess(normalize(data.items)));
    yield put(setPagination({data}));
  }
  catch (e) {
    openNotificationWithIcon("error", "OOPS!...", "Something went wrong");
  }

  yield put(toggleLoader({data: false}));

  history.push({search: queryString})
}