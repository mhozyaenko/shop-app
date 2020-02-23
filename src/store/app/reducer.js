import {
  FIRST_UPLOAD_INIT,
  TOGGLE_LOADER, TOGGLE_MODAL
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isFirstLoad: true,
  modals: {
    addProduct: false,
    updateProduct: false
  }
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case FIRST_UPLOAD_INIT:
      return {
        ...state,
        isFirstLoad: false,
      };
    case TOGGLE_LOADER:
      return {
        ...state,
        isLoading: action.data
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.name]: action.status
        }
      }
    default:
      return state;
  }
}