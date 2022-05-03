import React from 'react';
import PropTypes from 'prop-types';
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

      <Product
        productName={ item.title }
        productImage={ item.thumbnail }
        productPrice={ item.price }
        handleClick={ handleClick }
        productId={ item.id }
        freeShipping={ item.shipping.free_shipping }
        key={ item.id }
      />
    ));
  };

  render() {
    const { search } = this.state;
    const { loading, searchProductByCategory, productList } = this.props;
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
              <p className={ styles.notFound }>Nenhum produto foi encontrado</p>
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
  loading: PropTypes.bool.isRequired,
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchProduct: PropTypes.func.isRequired,
  searchProductByCategory: PropTypes.func.isRequired,
};

export default Home;
