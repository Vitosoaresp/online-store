import React from 'react';
import './App.css';
import * as api from './services/api'

class App extends React.Component{
  async componentDidMount() {
    const categories = await api.getProductsFromCategoryAndQuery('MLB1055', 'Motorola');
    console.log(categories);
    
  }

  render () {
    return <h1>App</h1>
  }
}

export default App;
