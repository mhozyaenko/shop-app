import React from 'react';
import PropTypes from 'prop-types';
import {Typography, List, Button, Icon, Spin} from 'antd';
import Text from "antd/es/typography/Text";
import {Link} from "react-router-dom";
import {
  selectCartDetails,
  selectCartEntities,
  selectCartIds,
  selectCartItemsCount, selectCartTotalSum
} from "../store/cart/selectors";
import {connect} from "react-redux";
import {
  decrementItemsCount,
  incrementItemsCount,
  removeItemsFromCart
} from "../store/cart/actions";
import {withRouter} from "react-router";
import {useRunSaga} from "./AppWrapper";
import postOrderSaga from "../store/sagas/postOrderSaga";
import {compose} from "redux";
import {selectAppLoading} from "../store/app/selectors";

const {Title} = Typography;
const {Item} = List;
const ButtonGroup = Button.Group;

function Cart({ isLoading,
                cartItems,
                cartIds,
                products,
                cartTotalItems,
                cartTotalSum,
                incrementItemsCount,
                decrementItemsCount,
                removeItemsFromCart}) {

  const confirmOrder = useRunSaga(postOrderSaga);

  return (
    cartTotalItems > 0 ?
    <Spin spinning={isLoading}>
      <List header={<Typography>
        <Title>Cart</Title>
        <Link to='/products'>continue shopping</Link>
      </Typography>}
            style={{padding: 20}}
            footer={
              <div>
                <strong>
                  Total Sum: {cartTotalSum} UAH
                </strong>
                <Button type="primary"
                        style={{marginLeft: 50}}
                        onClick={confirmOrder}>
                  Confirm Order
                </Button>
              </div>}>
        {cartIds.map(id => (
          <Item key={id}>
            <Item.Meta
              title={
                <Typography>
                  <Text>{products[id].name}</Text>
                  <Link
                    style={{paddingLeft: 25}}
                    to={`/product/${id}`}>
                    View details
                  </Link>
                </Typography>
              }
              description={`${products[id].price} UAH`}
            />
            <ButtonGroup>
              <Button
                onClick={() => cartItems[id].count === 1 ?
                  removeItemsFromCart({id}) :
                  decrementItemsCount({id})}>
                -
              </Button>
              <span className='items-count'>
                  {cartItems[id].count}
                </span>
              <Button onClick={() => incrementItemsCount({id})}>+</Button>
              <Button
                onClick={() => removeItemsFromCart({id})}
                style={{marginLeft: 20}}
                type="danger">
                <Icon type="delete" />
              </Button>
            </ButtonGroup>
          </Item>
        ))}
      </List>
    </Spin>
      :
    <Typography>
      <Title>
        Your cart is empty!
      </Title>
      <Text>
        To choose some of our awesome products go to
        <Link to='/products'> our store</Link>
      </Text>
    </Typography>
  )
}

const mapStateToProps = state => ({
  cartItems: selectCartEntities(state),
  cartIds: selectCartIds(state),
  products: selectCartDetails(state),
  cartTotalItems: selectCartItemsCount(state),
  cartTotalSum: selectCartTotalSum(state),
  isLoading: selectAppLoading(state)
});

const actions = {
  incrementItemsCount,
  decrementItemsCount,
  removeItemsFromCart
};

Cart.propTypes = {
  cartItems: PropTypes.object,
  cartIds: PropTypes.array,
  products: PropTypes.object,
  cartTotalItems: PropTypes.number,
  cartTotalSum: PropTypes.number,
  incrementItemsCount: PropTypes.func,
  decrementItemsCount: PropTypes.func,
  removeItemsFromCart: PropTypes.func,
  isLoading: PropTypes.bool
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions))
(Cart);