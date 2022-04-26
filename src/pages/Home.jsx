import React from 'react';
import Categories from '../components/Categories';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

handleChange = ({ target }) => {
  const { value } = target;
  this.setState({ search: value });
}

render() {
  const { search } = this.state;
  return (
    <div>
      <input
        name="search"
        type="text"
        value={ search }
        onChange={ this.handleChange }
      />
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <Categories />
    </div>
  );
}
}

export default Home;
