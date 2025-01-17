import React, {Fragment} from "react";
import AppHeader from "../containers/AppHeader";
import ProductDetails from "../containers/ProductDetails";
import {withRouter} from "react-router";

function ProductRoute() {

  return (
    <Fragment>
      <AppHeader title="Product details" />
      <ProductDetails/>
    </Fragment>
  )
}

export default withRouter(ProductRoute);