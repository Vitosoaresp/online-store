import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import addProductLocalStorage from './services/addProductLocalStorage';
import { getProductsFromCategoryAndQuery } from './services/api';
import Header from './components/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartList: JSON.parse(localStorage.getItem('cart')) || [],
      cartLength: JSON.parse(localStorage.getItem('lengthCart')) || 0,
      productList: [],
      loading: false,
    };
  }

  searchProduct = async (search, searchCategorie) => {
    const resultSearch = await getProductsFromCategoryAndQuery(
      searchCategorie,
      search,
    );
    this.setState({ productList: resultSearch.results, loading: true });
  };

  searchProductByCategory = async ({ target }) => {
    const searchCategorie = target.id;
    const resultSearch = await getProductsFromCategoryAndQuery(
      searchCategorie,
      '',
    );
    this.setState({
      productList: resultSearch.results,
      loading: true,
    });
  };

  handleClick = async ({ target }) => {
    this.setState(
      (prevState) => ({
        cartLength: prevState.cartLength + 1,
      }),
      () => {
        const { cartLength } = this.state;
        localStorage.setItem('lengthCart', JSON.stringify(cartLength));
      },
    );
    const itemId = target.id;
    const { productList } = this.state;
    const product = productList.find((item) => item.id === itemId);
    const newProduct = {
      ...product,
      quantity: 1,
    };
    this.setState(
      (prevState) => ({
        cartList: prevState.cartList.some((item) => item.id === itemId)
          ? prevState.cartList.map((item) => ({
            ...item,
            quantity: item.id === itemId ? item.quantity + 1 : item.quantity,
          }))
          : [...prevState.cartList, newProduct],
      }),
      () => {
        const { cartList } = this.state;
        addProductLocalStorage(cartList);
      },
    );
  };

  decrementQuantity = ({ target }) => {
    this.setState(
      (prevState) => ({
        cartLength: prevState.cartLength - 1,
      }),
      () => {
        const { cartLength } = this.state;
        localStorage.setItem('lengthCart', JSON.stringify(cartLength));
      },
    );
    const itemId = target.id;
    this.setState(
      (prevState) => ({
        cartList: prevState.cartList.map((item) => {
          if (item.id === itemId) {
            return ({
              ...item,
              quantity: item.quantity <= 1 ? 1 : item.quantity - 1,
            });
          }
          return item;
        }),
      }),
      () => {
        const { cartList } = this.state;
        addProductLocalStorage(cartList);
      },
    );
  };

  render() {
    const { cartList, cartLength, productList, loading, totalPrice } = this.state;
    return (
      <BrowserRouter>
        <Header cartLength={ cartLength } />
        <Switch>
          <Route
            path="/product/:id"
            render={ (props) => (
              <ProductDetails
                { ...props }
                handleClick={ this.handleClick }
              />
            ) }
          />
          <Route
            path="/cart"
            render={ (props) => (
              <Cart
                { ...props }
                cartList={ cartList }
                decrementQuantity={ this.decrementQuantity }
                handleClick={ this.handleClick }
                totalPrice={ totalPrice }
              />
            ) }
          />
          <Route
            path="/checkout"
            render={ (props) => (
              <Checkout
                { ...props }
                cartList={ cartList }
              />
            ) }
          />
          <Route path="/">
            <Home
              handleClick={ this.handleClick }
              cartLength={ cartLength }
              productList={ productList }
              loading={ loading }
              searchProduct={ this.searchProduct }
              searchProductByCategory={ this.searchProductByCategory }
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
