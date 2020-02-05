import {useDispatch, useSelector} from "react-redux";
import {selectCartIds, selectProductsObj} from "../store/selectors";
import {useEffect} from "react";
import {saveProductDetails} from "../store/cart/actions";

/**
 * save added to cart products to avoid losing details while changing products list
 */
export default function useCartProductDetails() {
  const cartIds = useSelector(selectCartIds);
  const products = useSelector(selectProductsObj);
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {};
    if (cartIds.length > 0) {
      cartIds.map(id => {
        if (products[id]) {
          payload[id] = products[id]
        }
      });
    }
    console.log(payload);
    dispatch(saveProductDetails({payload}));

  }, [cartIds]);

}