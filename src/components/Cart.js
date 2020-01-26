import React, {useContext} from 'react';
import {CartContext} from "../providers/CartProvider";
import {Typography, List, Button, Icon} from 'antd';
import Text from "antd/es/typography/Text";
import {Link} from "react-router-dom";

const {Title} = Typography;
const {Item} = List;
const ButtonGroup = Button.Group;

/**
 * cart component
 * @returns {*}
 * @constructor
 */
export default function Cart() {
  const {
    cart,
    countTotalSum,
    addOneItem,
    removeOneItem,
    removeItems
  } = useContext(CartContext);

  return (
    cart.length > 0 ?
    <List header={<Typography>
                    <Title>Cart</Title>
                    <Link to='/'>continue shopping</Link>
                  </Typography>}
          dataSource={cart}
          style={{padding: 20}}
          renderItem = {item => (
            <Item>
              <Item.Meta
                title={
                  <Typography>
                    <Text>{item.name}</Text>
                    <Link
                      style={{paddingLeft: 25}}
                      to={`/product/${item.id}`}>
                      View details
                    </Link>
                  </Typography>
                }
                description={`${item.price} UAH`}
                />
              <ButtonGroup>
                <Button onClick={() => removeOneItem(item.id)}>-</Button>
                <span className='items-count'>
                  {item.count}
                </span>
                <Button onClick={() => addOneItem(item.id)}>+</Button>
                <Button
                  onClick={() => removeItems(item.id)}
                  style={{marginLeft: 20}}
                  type="danger">
                  <Icon type="delete" />
                </Button>
              </ButtonGroup>
            </Item>
          )}
          footer={<strong>Total Sum: {countTotalSum()} UAH</strong>}>
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