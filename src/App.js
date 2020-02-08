import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Cart from "./containers/Cart";
import Page404 from "./components/Page404";
import ProductsListRoute from "./routes/ProductsListRoute";
import ProductRoute from "./routes/ProductRoute";
import useProductsList from "./hooks/useProductsList";
import useCartProductDetails from "./hooks/useCartProductDetails";

function App() {
  useProductsList();
  useCartProductDetails();

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <ProductsListRoute/>
        </Route>
        <Route path="/product/:productId" exact>
          <ProductRoute/>
        </Route>
        <Route path="/cart" exact>
          <Cart/>
        </Route>
        <Route path="*">
          <Page404/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
