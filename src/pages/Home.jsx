import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import Categories from '../components/Categories';
import styles from '../modules/Home.module.css';

function Home({
  searchProduct, productList, loading, searchProductByCategory, handleClick }) {
  const [search, setSearch] = useState('');

  const searchClean = () => {
    searchProduct(search, '');
    setSearch('');
  };

  const showProducts = () => productList.map((item) => (
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

  return (
    <div className={ styles.container }>
      <section className={ styles.main }>
        <div className={ styles.categoriesContainer }>
          <Categories
            searchProductByCategory={ searchProductByCategory }
          />
        </div>
        <div className={ styles.productsGrid }>
          <section className={ styles.inputContainer }>
            <input
              data-testid="query-input"
              name="search"
              type="text"
              value={ search }
              onChange={ ({ target }) => setSearch(target.value) }
              placeholder="Digite algum termo de pesquisa ou escolha uma categoria..."
            />
            <button
              onClick={ searchClean }
              type="button"
              data-testid="query-button"
            >
              Buscar
            </button>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </section>
          <div className={ styles.productsContainer }>
            {loading && productList.length === 0 && (
              <p className={ styles.notFound }>Nenhum produto foi encontrado</p>
            )}

            {showProducts()}
          </div>
        </div>
      </section>
    </div>
  );
}

Home.propTypes = {
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchProduct: PropTypes.func.isRequired,
  searchProductByCategory: PropTypes.func.isRequired,
};

export default Home;
