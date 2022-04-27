import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/"><Home /></Route>
        <Route path="/cart"><Cart /></Route>
      </BrowserRouter>
    );
  }
}

export default App;
