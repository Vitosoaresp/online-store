import React from 'react';
import Product from '../components/Product';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchCategorie: '',
      productList: [],
      loading: false,
    };
  }

handleChange = ({ target }) => {
  const { value } = target;
  this.setState({ search: value });
}

searchProduct = async () => {
  const { search, searchCategorie } = this.state;
  const resultSearch = await getProductsFromCategoryAndQuery(searchCategorie, search);
  this.setState({ productList: resultSearch.results, loading: true });
}

showProducts = () => {
  const { productList } = this.state;
  return productList.map((item) => (
    <div key={ item.id }>
      <Product
        productName={ item.title }
        productImage={ item.thumbnail }
        productPrice={ item.price }
      />
    </div>
  ));
}

render() {
  const { productList, search, loading } = this.state;
  return (
    <div>
      <section>
        <input
          data-testid="query-input"
          name="search"
          type="text"
          value={ search }
          onChange={ this.handleChange }
        />
        <button
          onClick={ this.searchProduct }
          type="button"
          data-testid="query-button"
        >
          Buscar
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </section>
      <section>

        {
          loading && productList.length === 0 && (<p>Nenhum produto foi encontrado</p>)
        }
        {this.showProducts()}
      </section>

    </div>
  );
}
}

export default Home;
