import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          path="/product/:id"
          render={ (props) => <ProductDetails { ...props } /> }
        />
        <Route path="/cart" component={ Cart } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
