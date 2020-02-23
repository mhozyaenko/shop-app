import {select, put} from 'redux-saga/effects';
import {selectProductInCart} from "../cart/selectors";
import {addItemsToCart, incrementItemsCount, saveProductDetails} from "../cart/actions";
import {selectProductById} from "../products/selectors";

export default function* addToCartSaga(id) {
  const productInCart = yield select(selectProductInCart(id.id));

  if(productInCart) {
    yield put(incrementItemsCount(id))
  } else {
    const product = yield select(selectProductById(id.id));
    const payload = {};
    payload[id.id] = product;
    yield put(addItemsToCart(id));
    yield put(saveProductDetails({payload}));
  }
}
