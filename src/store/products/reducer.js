const initialState = {
  byIds: {},
  idArray: [],
};

export default function ProductsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS_SUCCESS':
      return {
        ...state,
          byIds: {...action.dataObject},
          idArray: [...action.keys],
      };

    default:
      return state;
  }
}