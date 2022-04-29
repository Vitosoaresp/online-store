import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import addProductLocalStorage from './services/addProductLocalStorage';
import { getProductsFromId } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartList: JSON.parse(localStorage.getItem('cart')) || [],
      cartLength: JSON.parse(localStorage.getItem('lengthCart')) || 0,
    };
  }

  handleClick = async ({ target }) => {
    this.setState((prevState) => ({
      cartLength: prevState.cartLength + 1,
    }), () => {
      const { cartLength } = this.state;
      localStorage.setItem('lengthCart', JSON.stringify(cartLength));
    });
    const itemId = target.id;
    const p = await getProductsFromId(itemId);
    const product = {
      title: p.title,
      price: p.price,
      thumbnail: p.thumbnail,
      id: p.id,
      quantity: 1,
    };
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, product],
    }), () => {
      const { cartList } = this.state;
      addProductLocalStorage(cartList);
      this.getLengthCart();
    });
  }

  getLengthCart = () => {
    const { cartList } = this.state;
    const length = cartList.reduce((acc, curr) => curr.quantity + acc, 0);
    return length;
  }

  render() {
    const { cartList, cartLength } = this.state;
    // const lengthCart = this.getLengthCart();
    // console.log(lengthCart);
    // console.log(cartLength);
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/product/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              handleClick={ this.handleClick }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => <Cart { ...props } cartList={ cartList } /> }
          />
          <Route path="/checkout"><Checkout cartList={ cartList } /></Route>
          <Route path="/">
            <Home handleClick={ this.handleClick } cartLength={ cartLength } />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
