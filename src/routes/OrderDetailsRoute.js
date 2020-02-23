import React, {Fragment} from 'react';
import AppHeader from "../containers/AppHeader";
import {Layout} from "antd";
import {useParams, withRouter} from "react-router";
import OrderItem from "../components/OrderItem";
import {useSelector} from "react-redux";
import {selectOrderById} from "../store/orders/selectors";
import {useInjectSaga} from "../containers/AppWrapper";
import fetchOrderSaga from "../store/sagas/fetchOrderSaga";

const {Content} = Layout;

function OrderDetailsRoute() {
  const {orderId} = useParams();
  const order = useSelector(selectOrderById(orderId));
  useInjectSaga('fetchOrder', fetchOrderSaga, orderId);

  return (
    <Fragment>
      <AppHeader title="Order Details" homePage />
      <Layout>
        <Content>
          {order && <OrderItem order={order} />}
        </Content>
      </Layout>
    </Fragment>
  )
}

export default withRouter(OrderDetailsRoute);