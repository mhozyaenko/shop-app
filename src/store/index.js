import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import productsReducer from "./products/reducer";
import cartReducer from "./cart/reducer";
import filtersReducer from "./filters/reducer";
import {reducer as formReducer} from 'redux-form';
import {composeWithDevTools} from "redux-devtools-extension";
import rootSaga from "./sagas/rootSaga";
import appReducer from "./app/reducer";
import ordersReducer from "./orders/reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  filters: filtersReducer,
  form: formReducer,
  app: appReducer,
  orders: ordersReducer
});

const createSagaInjector = (runSaga, rootSaga) => {
  const injectedSagas = new Map();

  const isInjected = (key) => injectedSagas.has(key);

  const injectSaga = (key, saga, ...args) => {
    if (isInjected(key)) {
      return;
    }
    const task = runSaga(saga, ...args);
    injectedSagas.set(key, task);
  };

  const ejectSaga = (key) => {
    const task = injectedSagas.get(key);

    if (task && task.isRunning()) {
      task.cancel();
    }

    injectedSagas.delete(key);
  };

  if (rootSaga) {
    injectSaga('root', rootSaga);
  }

  return { injectSaga, ejectSaga, runSaga };
};

export const configureStore = ({history}) => {

  const sagaMiddleware = createSagaMiddleware({
    context: {
      history
    }
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  Object.assign(store, createSagaInjector(sagaMiddleware.run, rootSaga));

  return store;
};

