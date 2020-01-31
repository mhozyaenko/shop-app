import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ProductsProvider from "./providers/Products.Provider";
import ProductList from "./components/ProductsList";
import AppHeader from "./components/AppHeader";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import CartProvider from "./providers/CartProvider";
import Page404 from "./components/Page404";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <AppHeader title="Products List" homePage/>
              <ProductList/>
            </Route>
            <Route path="/product/:productId" exact>
              <AppHeader title="Product details"/>
              <ProductDetails/>
            </Route>
            <Route path="/cart" exact>
              <Cart/>
            </Route>
            <Route path="*">
              <Page404/>
            </Route>
          </Switch>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
