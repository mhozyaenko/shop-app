import React, {useContext} from 'react';
import {Card, Button} from 'antd'
import moment from 'moment';
import {Link} from "react-router-dom";
import {CartContext} from "../providers/CartProvider";

const {Meta} = Card;

/**
 *
 * @param product - product info
 * @param single - true: single item / false: item of list
 * @returns {*}
 * @constructor
 */
export default function ProductItem({product, single}) {
  const {id, name, price, origin} = product;
  const date = moment(product.date).format('DD.MM.YYYY');
  const {addToCart} = useContext(CartContext);

  return (
    <Card
      hoverable={!single}
      bordered={!single}
      className={single ? 'product-detail' : 'product-item'}
      title={name}
      extra= {
        !single &&
        <Link to={`/product/${id}`} >
          More
        </Link>
      }>
      <Meta title={`price: ${price} UAH`}
            style={{margin: '20px 0'}}/>
      <Meta title={`origin: ${origin}`}
            description={`date: ${date}`}/>
      <Button
        onClick={() => addToCart(id, name, price)}
        type="primary"
        style={{marginTop: 20}}>
        Add to cart
      </Button>
    </Card>
  )
}