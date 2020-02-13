import {MAXPRICE, MINPRICE} from "../../constants/filterOptions";

const initialState = {
  origin: [],
  minPrice: MINPRICE,
  maxPrice: MAXPRICE,
  page: null,
  perPage: null,
  totalItems: null,
  editable: false,
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ORIGINS':
      return {
        ...state,
        origin: [...action.checkedValues]
      };
    case 'RESET_ORIGINS':
      return {
        ...state,
        origin: []
      };
    case 'SET_PRICES':
      return {
        ...state,
        minPrice: action.value[0],
        maxPrice: action.value[1]
      };
    case 'RESET_PRICES':
      return {
        ...state,
        minPrice: MINPRICE,
        maxPrice: MAXPRICE
      };
    case 'SET_PAGINATION':
      return {
        ...state,
        page: action.data.page,
        perPage: action.data.perPage,
        totalItems: action.data.totalItems
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.page
      };
    case 'SET_PAGE_ITEMS':
      return {
        ...state,
        page: action.current,
        perPage: action.size
      };
    case 'SET_EDITABLE':
      return {
        ...state,
        editable: true,
      };
    case 'SET_NOT_EDITABLE':
      return {
        ...state,
        editable: false,
      };
    default:
      return state;
  }
}
