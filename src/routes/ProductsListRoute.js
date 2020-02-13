import React, {Fragment, useEffect} from "react";
import AppHeader from "../containers/AppHeader";
import ProductsList from "../containers/ProductsList";
import {Layout} from "antd";
import ProductsFilter from "../containers/ProductsFilter";
import connect from "react-redux/es/connect/connect";
import {selectFiltersEditable} from "../store/selectors";
import {setNotEditable} from "../store/filters/action";

const {Sider, Content} = Layout;

function ProductsListRoute({isEditable, setNotEditable}) {
useEffect( () => {
  if (isEditable) setNotEditable()
}, [isEditable]);

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

const mapStateToProps = state => ({
  isEditable: selectFiltersEditable(state)
});

const actions = {
  setNotEditable
};

const enhance = connect(mapStateToProps, actions);

export default enhance(ProductsListRoute)
