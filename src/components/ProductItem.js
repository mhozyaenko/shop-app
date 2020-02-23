import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'antd'
import moment from 'moment';
import {Link} from "react-router-dom";
import {useRunSaga} from "../containers/AppWrapper";
import addToCartSaga from "../store/sagas/addToCartSaga";
import {productShape} from "../shapes/productShape";

const {Meta} = Card;

function ProductItem({product, single, editProductClick}) {
  const {id, name, price, origin, isEditable} = product;
  const date = moment(product.date).format('DD.MM.YYYY');
  const addProductClick = useRunSaga(addToCartSaga);

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
        onClick={() => addProductClick({id})}
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

ProductItem.propTypes = {
  product: productShape.isRequired,
  single: PropTypes.bool,
  editProductClick: PropTypes.func
};

ProductItem.defaultProps = {
  editProductClick: null
};

export default ProductItem;