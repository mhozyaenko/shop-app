import React from 'react';
import {useParams} from "react-router-dom";
import {useProduct} from "../hooks/useProduct";
import {Spin} from "antd";
import ProductItem from "./ProductItem";

/**
 * Product details component
 * @returns {*}
 * @constructor
 */
export default function ProductDetails() {
  const {productId} = useParams();
  const {product} = useProduct(productId);
  return (
    !product ?
      <Spin size="large" /> :
    <ProductItem product={product} single />
  )
}