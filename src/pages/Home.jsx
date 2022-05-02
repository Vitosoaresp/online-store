import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsFillCartFill } from 'react-icons/bs';
import Product from '../components/Product';
import Categories from '../components/Categories';
import styles from '../modules/Home.module.css';

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
  };

  showProducts = () => {
    const { handleClick, productList } = this.props;
    return productList.map((item) => (
      <div key={ item.id } className={ styles.showProducts }>
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
    const { cartLength, loading, searchProductByCategory, productList } = this.props;
    const cartIcon = <BsFillCartFill />;
    return (
      <div className={ styles.container }>
        <section className={ styles.inputContainer }>
          <input
            data-testid="query-input"
            name="search"
            type="text"
            value={ search }
            onChange={ this.handleChange }
            placeholder="Digite algum termo de pesquisa ou escolha uma categoria..."
          />
          <button
            onClick={ this.searchClean }
            type="button"
            data-testid="query-button"
          >
            Buscar
          </button>
          <div className={ styles.cartContainer }>
            <Link to="/cart" data-testid="shopping-cart-button">
              {cartIcon}
            </Link>
            <span data-testid="shopping-cart-size">{cartLength}</span>
          </div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </section>
        <section className={ styles.main }>
          <div className={ styles.categoriesContainer }>
            <Categories
              searchProductByCategory={ searchProductByCategory }
            />
          </div>
          <div className={ styles.productsContainer }>
            {loading && productList.length === 0 && (
              <p>Nenhum produto foi encontrado</p>
            )}
            {this.showProducts()}
          </div>

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
