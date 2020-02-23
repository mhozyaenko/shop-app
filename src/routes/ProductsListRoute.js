import React, {Fragment} from "react";
import AppHeader from "../containers/AppHeader";
import ProductsList from "../containers/ProductsList";
import {Layout} from "antd";
import ProductsFilter from "../containers/ProductsFilter";
import {withRouter} from "react-router";

const {Sider, Content} = Layout;

const ProductsListRoute = () => (
    <Fragment>
      <AppHeader title="Products List" />
      <Layout>
        <Sider width={250} theme="light">
          <ProductsFilter />
        </Sider>
        <Content>
          <ProductsList />
        </Content>
      </Layout>
    </Fragment>
);

export default withRouter(ProductsListRoute);
