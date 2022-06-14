import React, { useContext } from 'react';
import { CgCloseR } from 'react-icons/cg';
import OnlineStoreContext from '../context/OnlineStoreContext';
import styles from '../modules/CategoriesMobile.module.css';

function CategoriesMobile() {
  const {
    categories, selectedCategory, setHiddenMenu,
    searchProductByCategory } = useContext(OnlineStoreContext);

  return (
    <div className={ styles.categoriesMobileContainer }>
      <h2>Categorias</h2>
      <CgCloseR className={ styles.close } onClick={ () => setHiddenMenu(true) } />
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