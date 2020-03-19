import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Cart from "./containers/Cart";
import Page404 from "./components/Page404";
import ProductsListRoute from "./routes/ProductsListRoute";
import ProductRoute from "./routes/ProductRoute";
import OwnProductsListRoute from "./routes/OwnProductsListRoute";
import OrdersRoute from "./routes/OrdersRoute";
import OrderDetailsRoute from "./routes/OrderDetailsRoute";
import AppWrapper from "./containers/AppWrapper";
import {Redirect} from "react-router";

function App() {

  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/">
          <Redirect to="/products"/>
        </Route>
        <Route path="/products">
        <ProductsListRoute />
        </Route>
        <Route path="/product/:productId" exact>
          <ProductRoute/>
        </Route>
        <Route path="/cart" exact>
          <Cart/>
        </Route>
        <Route path="/my-products">
          <OwnProductsListRoute/>
        </Route>
        <Route path="/orders" exact>
          <OrdersRoute />
        </Route>
        <Route path="/orders/:orderId">
          <OrderDetailsRoute/>
        </Route>
        <Route path="*">
          <Page404/>
        </Route>
      </Switch>
    </AppWrapper>
  );
}

export default App;
