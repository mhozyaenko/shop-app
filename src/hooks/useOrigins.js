import {useDispatch, useSelector} from "react-redux";
import {selectProductOrigins} from "../store/selectors";
import {useEffect, useMemo} from "react";
import {getOrigins} from "../api/products";
import {getOriginsSuccess} from "../store/products/actions";

export default function useOrigins() {
  const dispatch = useDispatch();
  const origins = useSelector(selectProductOrigins);

  useEffect(() => {
    getOrigins()
      .then(data => dispatch(getOriginsSuccess(data)))
  }, [dispatch]);

  return useMemo(
    () => ({origins}), [origins]
  );
}