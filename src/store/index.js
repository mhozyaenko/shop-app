import { combineReducers } from "redux";
import productsReducer from "./products/reducer";
import cartReducer from "./cart/reducer";
import filtersReducer from "./filters/reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  filters: filtersReducer,
});

export default rootReducer;