import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import Categories from '../components/Categories';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchCategorie: '',
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  searchClean = () => {
    const { search, searchCategorie } = this.state;
    const { searchProduct } = this.props;
    searchProduct(search, searchCategorie);
    this.setState({ search: '' });
  }

  showProducts = () => {
    const { handleClick, productList } = this.props;
    return productList.map((item) => (
      <div key={ item.id }>
        <Product
          productName={ item.title }
          productImage={ item.thumbnail }
          productPrice={ item.price }
          handleClick={ handleClick }
          productId={ item.id }
          freeShipping={ item.shipping.free_shipping }
        />
      </div>
    ));
  };

  render() {
    const { search } = this.state;
    const {
      cartLength,
      loading,
      searchProductByCategory,
      productList,
    } = this.props;
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
            onClick={ this.searchClean }
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
          <Categories searchProductByCategory={ searchProductByCategory } />
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
  loading: PropTypes.bool.isRequired,
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchProduct: PropTypes.func.isRequired,
  searchProductByCategory: PropTypes.func.isRequired,
};

export default Home;
