const initialState = {
  byIds: {},
  idArray: [],
  origins: [],
};

export default function ProductsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS_SUCCESS':
      return {
        ...state,
          byIds: {...action.dataObject},
          idArray: [...action.keys],
      };
    case 'GET_ORIGINS_SUCCESS':
      return {
        ...state,
        origins: [...action.items]
      };
    case 'SET_CHANGED_PRODUCT':
      return {
        ...state,
        byIds: {...state.byIds,
          [action.data.id]: action.data}
      };
    default:
      return state;
  }
}