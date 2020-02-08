import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getProducts} from "../api/products";
import {getProductsSuccess} from "../store/products/actions";
import {selectFilters, selectProductsObj} from "../store/selectors";
import {filtersToString, normalize} from "../helpers";
import {setPagination} from "../store/filters/action";

/**
 * get data from api and save it in redux store
 * @returns {{products: *}}
 */
export default function useProductsList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsObj);
  const filters = useSelector(selectFilters);
  const queryString = filtersToString(filters);

  useEffect(() => {
      getProducts(queryString)
        .then(data => {
          dispatch(getProductsSuccess(normalize(data.items)));
          dispatch(setPagination({data}))
        })

  }, [dispatch, queryString]);

  return useMemo(
    () => ({
      products
    }),
    [products]
  );
}