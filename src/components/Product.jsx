import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      adiciona: false,
    };

  handleClick = ({ target }) => {
    console.log(target);
}

  render() {
    const { productName, productImage, productPrice, productId } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product/${productId}` }>
          <h2>{ productName }</h2>
          <img alt="imagem do produto" src={ productImage } />
          <p>
            {`R$${productPrice}`}
          </p>
        </Link>
        <button
        data-testid="product-add-to-cart"
        type="button"
        onClick={ this.handleClick }
      >
        Adicione ao carrinho
      </button>
      </div>
    );

  }
}

Product.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};

export default Product;
