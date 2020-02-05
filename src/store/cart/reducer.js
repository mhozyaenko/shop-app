const initialState = {
  counter: {},
  ids: [],
  products:{}
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        counter: {...state.counter, [action.id]: {id: action.id, count: 1}},
        ids: [...state.ids, action.id]
      };

    case "INCREMENT_ITEMS_COUNT":
      return {
        ...state,
        counter: {...state.counter,
          [action.id]: {...state.counter[action.id], count: state.counter[action.id].count+1}
        }
      };

    case "DECREMENT_ITEMS_COUNT":
      return {
        ...state,
        counter: {...state.counter,
          [action.id]: {...state.counter[action.id], count: state.counter[action.id].count-1}
        }
      };

    case "REMOVE_ITEMS_FROM_CART":
      return {
        ...state,
        counter: {...state.counter, [action.id]: undefined},
        ids: state.ids.filter(item => item !== action.id)
      };

    case "SAVE_PRODUCT_DETAILS":
      return {
        ...state,
        products: {...state.products, ...action.payload}
      };

    default:
      return state;
  }
}