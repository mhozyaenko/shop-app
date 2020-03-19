import React from 'react';
import {useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import {Spin} from "antd";
import ProductItem from "../components/ProductItem";
import connect from "react-redux/es/connect/connect";
import {useInjectSaga} from "./AppWrapper";
import fetchProductSaga from "../store/sagas/fetchProductSaga";
import {useSelector} from "react-redux";
import {selectProductById} from "../store/products/selectors";
import {selectAppLoading} from "../store/app/selectors";

function ProductDetails({incrementItemsCount, addItemsToCart, isLoading}) {
  const {productId} = useParams();
  useInjectSaga('fetchProduct', fetchProductSaga, productId);

  const product = useSelector(selectProductById(productId));

  return (
    <Spin spinning={isLoading || !product } size="large">
      {product && <ProductItem product={product} single/>}
    </Spin>
  )
}

const mapStateToProps = (state) => ({
  isLoading: selectAppLoading(state),
});

const enhance = connect(mapStateToProps);

ProductDetails.propTypes = {
  incrementItemsCount: PropTypes.func,
  addItemsToCart: PropTypes.func,
  isLoading: PropTypes.bool
};

export default enhance(ProductDetails);
