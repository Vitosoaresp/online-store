import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/product/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
          <Route path="/cart"><Cart /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
