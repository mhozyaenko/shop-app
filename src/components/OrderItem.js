import React from 'react';
import {Card} from "antd";

const {Meta} = Card;

/**
 * order details component
 * @param order
 * @returns {*}
 * @constructor
 */
function OrderItem({order}) {
  return (
    order && <div>
      {order.pieces.map(item => (
          <Card
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

export default OrderItem;