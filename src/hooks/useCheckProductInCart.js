import {selectProductInCart} from "../store/selectors";
import {useSelector} from "react-redux";
import {useMemo} from "react";

/**
 * memoized data of added to cart products
 * @param id
 */
export default function useCheckProductInCart(id) {
  const isInCart = useSelector(selectProductInCart(id));
  return useMemo(() => isInCart, [isInCart])
}