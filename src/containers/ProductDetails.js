import React from 'react';
import {useParams} from "react-router-dom";
import {Spin} from "antd";
import ProductItem from "../components/ProductItem";
import connect from "react-redux/es/connect/connect";
import useProduct from "../hooks/useProduct";
import {addItemsToCart, incrementItemsCount} from "../store/cart/actions";
import {bindActionCreators} from "redux";

/**
 * Product details component
 * @returns {*}
 * @constructor
 */
function ProductDetails({incrementItemsCount, addItemsToCart}) {
  const {productId} = useParams();
  const {product} = useProduct(productId);

  const handleClick = (id, isInCart) => {
    isInCart ? incrementItemsCount(id) : addItemsToCart(id);
  };

  return (
    !product ?
      <Spin size="large" /> :
    <ProductItem product={product} single click={handleClick} />
  )
}

const actions = {
  addItemsToCart,
  incrementItemsCount
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = connect(null, mapDispatchToProps);

export default enhance(ProductDetails);
