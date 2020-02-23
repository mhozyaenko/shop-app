import React, {Fragment} from 'react';
import AppHeader from "../containers/AppHeader";
import ProductsFilter from "../containers/ProductsFilter";
import ProductsList from "../containers/ProductsList";
import {Layout} from "antd";
import {withRouter} from "react-router";
const {Sider, Content} = Layout;

const OwnProductsListRoute = () => (
    <Fragment>
      <AppHeader title="My Products" />
      <Layout>
        <Sider width={250} theme="light">
          <ProductsFilter />
        </Sider>
        <Content>
          <ProductsList ownProducts/>
        </Content>
      </Layout>
    </Fragment>
);

export default withRouter(OwnProductsListRoute);
