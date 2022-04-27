import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  render() {
    const { categories } = this.state;
    const { searchProductByCategory } = this.props;
    return (
      <aside>
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
}

Categories.propTypes = {
  searchProductByCategory: PropTypes.func.isRequired,
};

export default Categories;
