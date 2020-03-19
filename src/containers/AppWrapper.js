import React, {useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from "history";
import {configureStore} from "../store";
import {Provider} from "react-redux";

const history = createBrowserHistory();

const store = configureStore({
  history
});

const AppWrapper = ({ children }) => {

  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node
};

export default AppWrapper;

export function useInjectSaga(key, saga, ...args) {
  useEffect(() => {

    store.injectSaga(key, saga, ...args);

    return () => {
      store.ejectSaga(key);
    };
  }, [key, saga]);
};

export const useRunSaga = (saga, cancelOnUnmount) => {
      const taskRef = useRef(null);

      useEffect(
      () => () => {
      if (cancelOnUnmount && taskRef.current) {
      taskRef.current.cancel();
    }
    },
      []
      );

      return useCallback((...args) => {
      if (taskRef.current && taskRef.current.isRunning()) {
      taskRef.current.cancel();
    }

      taskRef.current = store.runSaga(saga, ...args);

      return taskRef.current.toPromise();
    }, []);
};