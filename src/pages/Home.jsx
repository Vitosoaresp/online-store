import React, { useContext, useState } from 'react';
import Product from '../components/Product';
import Categories from '../components/Categories';
import styles from '../modules/Home.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';

function Home() {
  const {
    searchProduct, productList, loading,
    searchProductByCategory, handleClick } = useContext(OnlineStoreContext);
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

            { productList && showProducts()}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
