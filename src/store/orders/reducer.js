import {GET_ORDER_BY_ID_SUCCESS, GET_ORDERS_SUCCESS} from "./actionTypes";

const initialState = {
  byIds: {},
  idArray: []
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        byIds: {...action.dataObject},
        idArray: [...action.keys],
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [action.data.id]: action.data
        },
        idArray: [...state.idArray, action.data.id]
      }
    default:
      return state;
  }
}