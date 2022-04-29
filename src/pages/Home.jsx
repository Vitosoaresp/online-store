import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';

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
  };

  searchProduct = async () => {
    const { search, searchCategorie } = this.state;
    const resultSearch = await getProductsFromCategoryAndQuery(
      searchCategorie,
      search,
    );
    this.setState({ productList: resultSearch.results, loading: true });
  };

  searchProductByCategory = async ({ target }) => {
    const { search } = this.state;
    const searchCategorie = target.id;
    this.setState({ searchCategorie });
    const resultSearch = await getProductsFromCategoryAndQuery(
      searchCategorie,
      search,
    );
    this.setState({
      productList: resultSearch.results,
      loading: true,
      search: '',
    });
  };

  showProducts = () => {
    const { productList } = this.state;
    const { handleClick } = this.props;
    return productList.map((item) => (
      <div key={ item.id }>
        <Product
          productName={ item.title }
          productImage={ item.thumbnail }
          productPrice={ item.price }
          handleClick={ handleClick }
          productId={ item.id }
        />
      </div>
    ));
  };

  render() {
    const { productList, search, loading } = this.state;
    const { cartLength } = this.props;
    // console.log(length);
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
          <Link to="/cart" data-testid="shopping-cart-button">
            Cart
          </Link>
          <span data-testid="shopping-cart-size">{cartLength}</span>
        </section>
        <section>
          <Categories searchProductByCategory={ this.searchProductByCategory } />
        </section>
        <section>
          {loading && productList.length === 0 && (
            <p>Nenhum produto foi encontrado</p>
          )}
          {this.showProducts()}
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  handleClick: PropTypes.func.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default Home;
