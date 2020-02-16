import {
  ADD_ITEM_TO_CART, CLEAR_CART,
  DECREMENT_ITEMS_COUNT,
  INCREMENT_ITEMS_COUNT,
  REMOVE_ITEMS_FROM_CART,
  SAVE_PRODUCT_DETAILS
} from "./actionTypes";

const initialState = {
  counter: {},
  ids: [],
  products:{}
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        counter: {...state.counter, [action.id]: {id: action.id, count: 1}},
        ids: [...state.ids, action.id]
      };

    case INCREMENT_ITEMS_COUNT:
      return {
        ...state,
        counter: {...state.counter,
          [action.id]: {...state.counter[action.id], count: state.counter[action.id].count+1}
        }
      };

    case DECREMENT_ITEMS_COUNT:
      return {
        ...state,
        counter: {...state.counter,
          [action.id]: {...state.counter[action.id], count: state.counter[action.id].count-1}
        }
      };

    case REMOVE_ITEMS_FROM_CART:
      return {
        ...state,
        counter: {...state.counter, [action.id]: undefined},
        ids: state.ids.filter(item => item !== action.id)
      };

    case SAVE_PRODUCT_DETAILS:
      return {
        ...state,
        products: {...state.products, ...action.payload}
      };

    case CLEAR_CART:
      return {
        counter: {},
        ids: [],
        products: {}
      };

    default:
      return state;
  }
}