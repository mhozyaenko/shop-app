import React from 'react';
import {Typography, List, Button, Icon} from 'antd';
import Text from "antd/es/typography/Text";
import {Link} from "react-router-dom";
import {
  selectCartDetails,
  selectCartEntities,
  selectCartIds,
  selectCartItemsCount, selectCartTotalSum
} from "../store/selectors";
import {connect} from "react-redux";
import {
  clearCart,
  decrementItemsCount,
  incrementItemsCount,
  removeItemsFromCart
} from "../store/cart/actions";
import {postOrder} from "../api/order";
import {openNotificationWithIcon} from "../services/notifications";
import {useHistory} from "react-router";

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
                cartTotalSum,
                incrementItemsCount,
                decrementItemsCount,
                removeItemsFromCart,
                clearCart}) {
  const history = useHistory();

  const confirmOrder = () => {
    const data = {order: {pieces: cartIds.map(item => ({productId: item, count: cartItems[item].count}))}};
    postOrder(data)
      .then(response => {
        if(response.id) {
          openNotificationWithIcon("success", "Thank you!", "Order is confirmed");
          clearCart();
          history.push(`/orders/${response.id}`);
        } else {
          openNotificationWithIcon("error", "OOPS!...", "Something went wrong");
        }
      });
  };

  return (
    cartTotalItems > 0 ?
    <List header={<Typography>
                    <Title>Cart</Title>
                    <Link to='/'>continue shopping</Link>
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
  cartTotalItems: selectCartItemsCount(state),
  cartTotalSum: selectCartTotalSum(state)
});

const actions = {
  incrementItemsCount,
  decrementItemsCount,
  removeItemsFromCart,
  clearCart
};

const enhance = connect(mapStateToProps, actions);

export default enhance(Cart);