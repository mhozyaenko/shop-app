import React from 'react';
import {Card, Button} from 'antd'
import moment from 'moment';
import {Link} from "react-router-dom";
import useCheckProductInCart from "../hooks/useCheckProductInCart";

const {Meta} = Card;

function ProductItem({product, single, addProductClick, editProductClick}) {

  const {id, name, price, origin, isEditable} = product;
  const date = moment(product.date).format('DD.MM.YYYY');
  const isInCart = useCheckProductInCart(id);

  return (
    <Card
      hoverable={!single}
      bordered={!single}
      className={single ? 'product-detail' : 'product-item'}
      title={name}
      extra= {
        (!single && !isEditable) &&
        <Link to={`/product/${id}`} >
          More
        </Link>
      }>
      <Meta title={`price: ${price} UAH`}
            style={{margin: '20px 0'}}/>
      <Meta title={`origin: ${origin}`}
            description={`date: ${date}`}/>
      {!isEditable ? <Button
        onClick={() => addProductClick({id}, isInCart)}
        type="primary"
        style={{marginTop: 20}}>
        Add to cart
      </Button> :
        <Button type="primary"
                onClick={() => editProductClick(id)}
                style={{marginTop: 20}}>
          Edit
        </Button>}
    </Card>
  )
}

export default ProductItem;