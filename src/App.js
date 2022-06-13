import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import addProductLocalStorage from './services/addProductLocalStorage';
import { getProductsFromCategoryAndQuery } from './services/api';
import Header from './components/Header';

function App() {
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('cart')) || [],
  );
  const [cartLength, setCartLength] = useState(
    JSON.parse(localStorage.getItem('lengthCart')) || 0,
  );
  const [productList, setProductList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const searchProduct = async (search, searchCategorie) => {
    const resultSearch = await getProductsFromCategoryAndQuery(
      searchCategorie,
      search,
    );
    setProductList(resultSearch.results);
    setIsFetching(false);
  };

  const searchProductByCategory = async ({ target }) => {
    const searchCategorie = target.id;
    const resultSearch = await getProductsFromCategoryAndQuery(
      searchCategorie,
      '',
    );
    setProductList(resultSearch.results);
  };

  useEffect(() => {
    const changeQuantityCart = () => {
      const length = cartList.reduce((acc, item) => acc + item.quantity, 0);
      setCartLength(length);
    };
    changeQuantityCart();
  }, [cartList]);

  const handleClick = async ({ target }) => {
    localStorage.setItem('lengthCart', JSON.stringify(cartLength));
    const itemId = target.id;
    const product = productList.find((item) => item.id === itemId);
    const newProduct = {
      ...product,
      quantity: 1,
    };
    const incrementedItemCart = cartList.some((item) => item.id === itemId);
    if (!incrementedItemCart) {
      return setCartList([...cartList, newProduct]);
    }
    const productSelect = cartList.find((item) => item.id === itemId);
    productSelect.quantity += 1;
    setCartList([...cartList]);
    addProductLocalStorage(cartList);
  };

  const decrementQuantity = ({ target }) => {
    localStorage.setItem('lengthCart', JSON.stringify(cartLength));
    const itemId = target.id;
    const productSelect = cartList.find((item) => item.id === itemId);
    productSelect.quantity -= 1;
    setCartList([...cartList]);
  };

  return (
    <BrowserRouter>
      <Header cartLength={ cartLength } />
      <Switch>
        <Route
          path="/product/:id"
          render={ (props) => (
            <ProductDetails
              { ...props }
              handleClick={ handleClick }
            />
          ) }
        />
        <Route
          path="/cart"
          render={ (props) => (
            <Cart
              { ...props }
              cartList={ cartList }
              decrementQuantity={ decrementQuantity }
              handleClick={ handleClick }
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
            handleClick={ handleClick }
            cartLength={ cartLength }
            productList={ productList }
            loading={ isFetching }
            searchProduct={ searchProduct }
            searchProductByCategory={ searchProductByCategory }
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
