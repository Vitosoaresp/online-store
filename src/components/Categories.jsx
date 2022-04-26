import React from 'react';
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
    return (
      <aside>
        <h2>Categorias</h2>
        {categories.map((category) => (
          <button
            key={ category.id }
            data-testid="category"
            id={ category.id }
            type="button"
          >
            { category.name }
          </button>
        ))}
      </aside>
    );
  }
}

export default Categories;
