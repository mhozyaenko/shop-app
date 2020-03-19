import {select, call, put} from 'redux-saga/effects';
import {getFormValues} from "redux-form";
import {postNewProduct, postUpdateProduct} from "../api/products";
import {openNotificationWithIcon} from "../../services/notifications";
import {toggleModal} from "../app/actions";
import {setChangedProduct} from "../products/actions";

export default function* submitFormSaga(name) {
  const data = yield select(getFormValues(name));
  let message = '';

  try {
    if (name === 'addProduct') {
      yield call(postNewProduct, data);
      message = 'Your product is succesfully added to our store';
    }

    if (name === 'updateProduct') {
      yield call(postUpdateProduct, data);
      yield put(setChangedProduct({data}));
      message = 'Your product is succesfully updated';
    }

    openNotificationWithIcon('success', 'Congrats!', message);
    yield put(toggleModal({name: name, status: false}))
  }
  catch (e) {
    openNotificationWithIcon('error', 'OOPS!', 'Something went wrong... Please try again')
  }
}