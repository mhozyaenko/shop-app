import React, {Fragment, useEffect} from 'react';
import AppHeader from "../containers/AppHeader";
import ProductsFilter from "../containers/ProductsFilter";
import ProductsList from "../containers/ProductsList";
import {Layout} from "antd";
import {selectFiltersEditable} from "../store/selectors";
import {setEditable} from "../store/filters/action";
import connect from "react-redux/es/connect/connect";
const {Sider, Content} = Layout;

function OwnProductsListRoute({isEditable, setEditable}) {
  useEffect( () => {
    if (!isEditable) setEditable()
  }, [isEditable]);


  return(
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
  )
}
const mapStateToProps = state => ({
  isEditable: selectFiltersEditable(state)
});

const actions = {
  setEditable
};

const enhance = connect(mapStateToProps, actions);

export default enhance(OwnProductsListRoute)
