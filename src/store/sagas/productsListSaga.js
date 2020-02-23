import {firstLoadInit } from "../products/actions";
import {put, getContext, select, fork, call, takeLatest} from 'redux-saga/effects';
import {
  resetAllFilters,
  setEditable, setFiltersFromObj,
  setNotEditable
} from "../filters/action";
import fetchOriginsSaga from "./fetchOriginsSaga";
import fetchProductsListSaga from "./fetchProductsListSaga";
import {
  RESET_ORIGINS,
  SET_FILTERS_FROM_OBJ,
  SET_ORIGINS,
  SET_PAGE,
  SET_PAGE_ITEMS,
  SET_PRICES
} from "../filters/actionTypes";
import {parseQueryString} from "../../helpers";
import {selectFiltersEditable} from "../filters/selectors";

export default function* productsListSaga() {
  const isEditable = yield select(selectFiltersEditable);
  const appState = yield select(state => state.app);
  const history = yield getContext('history');
  const {pathname, search} = history.location;

  yield put(resetAllFilters());

  yield put(setFiltersFromObj(
    {data: parseQueryString(search)}));

  if (pathname === '/products' && isEditable) {
    yield put(setNotEditable())
  }
  if (pathname === '/my-products' && !isEditable) {
    yield put(setEditable())
  }

  if (appState.isFirstLoad) {
    yield put(firstLoadInit());
    yield fork(fetchOriginsSaga);
  }

  yield call(fetchProductsListSaga, 0);

  yield takeLatest([
      SET_PAGE,
      SET_PAGE_ITEMS,
      SET_FILTERS_FROM_OBJ
    ],
    fetchProductsListSaga, 0);

  yield takeLatest([
      SET_ORIGINS,
      RESET_ORIGINS,
      SET_PRICES,
    ],
    fetchProductsListSaga, 1500);
}