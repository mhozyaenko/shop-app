import { combineReducers } from "redux";
import productsReducer from "./products/reducer";
import cartReducer from "./cart/reducer";
import filtersReducer from "./filters/reducer";
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  filters: filtersReducer,
  form: formReducer
});

export default rootReducer;