import React, {Fragment, useEffect, useState} from 'react';
import AppHeader from "../containers/AppHeader";
import {Layout} from "antd";
import {useParams} from "react-router";
import {getOrder} from "../api/order";
import OrderItem from "../components/OrderItem";

const {Content} = Layout;

function OrderDetailsRoute() {
  const {orderId} = useParams();
  const [order, setOrder] = useState(null);
  useEffect( () => {
    getOrder(orderId)
      .then(response => (setOrder(response)));
  }, [orderId]);
  return (
    <Fragment>
      <AppHeader title="Order Details" homePage />
      <Layout>
        <Content>
          <OrderItem order={order} />
        </Content>
      </Layout>

    </Fragment>
  )
}

export default OrderDetailsRoute;