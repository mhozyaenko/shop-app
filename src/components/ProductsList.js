import React, {useContext} from 'react';
import {ProductsContext} from "../providers/Products.Provider";
import ProductItem from "./ProductItem";
import {Spin} from "antd";

/**
 * list of products
 * @returns {*}
 * @constructor
 */
export default function ProductList() {
  const {products, isLoading} = useContext(ProductsContext);

  return (
    isLoading ?
      <Spin size="large"/> :
      <div className="products-list">
      {products.map( item => (
        <ProductItem key={item.id} product={item}/>
      ))}
    </div>
  )
}