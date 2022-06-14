import React, { useContext } from 'react';
import OnlineStoreContext from '../context/OnlineStoreContext';
import styles from '../modules/CategoriesMobile.module.css';

function CategoriesMobile() {
  const {
    categories, selectedCategory,
    searchProductByCategory } = useContext(OnlineStoreContext);

  return (
    <div className={ styles.categoriesMobileContainer }>
      <h2>Categorias</h2>
      {categories.map((category) => (
        <button
          key={ category.id }
          id={ category.id }
          className={
            category.id === selectedCategory
              ? styles.selected && styles.categoryMobile : styles.categoryMobile
          }
          type="button"
          onClick={ searchProductByCategory }
        >
          { category.name }
        </button>
      ))}
    </div>
  );
}

export default CategoriesMobile;
