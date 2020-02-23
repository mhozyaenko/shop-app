import React, {Fragment} from 'react';
import AppHeader from "../containers/AppHeader";
import {Layout} from "antd";
import OrdersList from "../containers/OrdersList";
import {withRouter} from "react-router";

const {Content} = Layout;

function OrdersRoute() {
  return(
    <Fragment>
      <AppHeader title="Orders List" homePage />
      <Layout>
        <Content>
          <OrdersList />
        </Content>
      </Layout>
    </Fragment>
  )
}

export default withRouter(OrdersRoute);