import React, {Fragment} from "react";
import AppHeader from "../containers/AppHeader";
import ProductsList from "../containers/ProductsList";
import {Layout} from "antd";
import ProductsFilter from "../containers/ProductsFilter";

const {Sider, Content} = Layout;

function ProductsListRoute() {

  return(
    <Fragment>
      <AppHeader title="Products List" homePage />
      <Layout>
        <Sider width={250} theme="light">
          <ProductsFilter />
        </Sider>
        <Content>
          <ProductsList />
        </Content>
      </Layout>
    </Fragment>
  )
}

export default ProductsListRoute;