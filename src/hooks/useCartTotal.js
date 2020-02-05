import {useSelector} from "react-redux";
import {selectCartArray, selectCartDetails} from "../store/selectors";
import {useMemo} from "react";

/**
 * memoized count of cart total sum
 */
export default function useCartTotal() {
  const cartItems = useSelector(selectCartArray);
  const cartDetails = useSelector(selectCartDetails);

  return useMemo(
    () => {
      return cartItems.reduce( (acc, cur) =>
        (acc + cur.count * cartDetails[cur.id].price), 0)
    },
    [cartDetails, cartItems]
  );
}