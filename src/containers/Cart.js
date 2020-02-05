import React from 'react';
import {Typography, List, Button, Icon} from 'antd';
import Text from "antd/es/typography/Text";
import {Link} from "react-router-dom";
import {
  selectCartDetails,
  selectCartEntities,
  selectCartIds,
  selectCartItemsCount
  } from "../store/selectors";
import {connect} from "react-redux";
import {
  decrementItemsCount,
  incrementItemsCount,
  removeItemsFromCart
} from "../store/cart/actions";
import {bindActionCreators} from "redux";
import useCartTotal from "../hooks/useCartTotal";

const {Title} = Typography;
const {Item} = List;
const ButtonGroup = Button.Group;

/**
 * cart component
 * @returns {*}
 * @constructor
 */
function Cart({
                cartItems,
                cartIds,
                products,
                cartTotalItems,
                incrementItemsCount,
                decrementItemsCount,
                removeItemsFromCart}) {

  const cartTotalSum = useCartTotal();

  return (
    cartTotalItems > 0 ?
    <List header={<Typography>
                    <Title>Cart</Title>
                    <Link to='/'>continue shopping</Link>
                  </Typography>}
          style={{padding: 20}}

          footer={<strong>Total Sum: {cartTotalSum} UAH</strong>}>
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
       :
    <Typography>
      <Title>
        Your cart is empty!
      </Title>
      <Text>
        To choose some of our awesome products go to
        <Link to='/'> our store</Link>
      </Text>
    </Typography>
  )
}

const mapStateToProps = state => ({
  cartItems: selectCartEntities(state),
  cartIds: selectCartIds(state),
  products: selectCartDetails(state),
  cartTotalItems: selectCartItemsCount(state)
});

const actions = {
  incrementItemsCount,
  decrementItemsCount,
  removeItemsFromCart
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Cart);