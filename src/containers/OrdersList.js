import React, {useEffect, useState} from 'react';
import {Card} from "antd";
import {getOrdersList} from "../api/order";
import moment from "moment";
import {Link} from "react-router-dom";

const {Meta} = Card;

function OrdersList() {
  const [orders, setOrders] = useState(null);
  useEffect( () => {
    if (!orders){
      getOrdersList()
        .then(response => setOrders(response))
    }
  }, [orders]);

  return (
    orders && <div>
      {orders.items.map(item => (
        <Card
          key={item.id}
          style={{marginBottom: 25}}
          bordered
          extra={<Link to={`/orders/${item.id}`}>See details</Link>}
          title={moment(item.createdAt).format('DD.MM.YYYY, HH:MM')}>
          {item.pieces.map((item) => (
            <Meta key={item.product.id}
                  title={`${item.product.name} - ${item.count}`}
                  style={{marginBottom: 20}}
                  description = {`${item.product.price}UAH, origin: ${item.product.origin}`} />
          ))}
        </Card>))}
    </div>
  )
}

export default OrdersList