import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/"><Home /></Route>
      </BrowserRouter>

  }
}

export default App;
