import React from 'react';
import {Card} from "antd";
import {orderShape} from "../shapes/orderShape";

const {Meta} = Card;

function OrderItem({order}) {
  return (
    order && <div>
      {order.pieces.map(item => (
          <Card key={item.id}
            title={`${item.product.name} - ${item.count} `}
            size="default">
            <Meta description={`price: ${item.product.price} UAH`}
                  style={{margin: '20px 0'}}/>
            <Meta description={`origin: ${item.product.origin}`}
                  />
          </Card>
      ))}
    </div>
  )
}

OrderItem.propTypes = {
  order: orderShape.isRequired
};

export default OrderItem;