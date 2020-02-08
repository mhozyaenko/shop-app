import React from 'react';
import {Card, Button} from 'antd'
import moment from 'moment';
import {Link} from "react-router-dom";
import useCheckProductInCart from "../hooks/useCheckProductInCart";

const {Meta} = Card;

/**
 *
 * @param product - product info
 * @param single - true: single item / false: item of list
 * @returns {*}
 * @constructor
 */
function ProductItem({product, single, click}) {
  const {id, name, price, origin} = product;
  const date = moment(product.date).format('DD.MM.YYYY');
  const isInCart = useCheckProductInCart(id);

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
        onClick={() => click({id}, isInCart)}
        type="primary"
        style={{marginTop: 20}}>
        Add to cart
      </Button>
    </Card>
  )
}

export default ProductItem;