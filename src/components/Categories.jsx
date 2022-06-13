import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import styles from '../modules/Categories.module.css';

function Categories({ searchProductByCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesByApi = await getCategories();
      setCategories(categoriesByApi);
    };
    fetchCategories();
  }, []);

  return (
    <aside className={ styles.Categories }>
      <h2>Categorias</h2>
      {categories.map((category) => (
        <button
          key={ category.id }
          data-testid="category"
          id={ category.id }
          type="button"
          onClick={ searchProductByCategory }
        >
          { category.name }
        </button>
      ))}
    </aside>
  );
}

Categories.propTypes = {
  searchProductByCategory: PropTypes.func.isRequired,
};

export default Categories;
