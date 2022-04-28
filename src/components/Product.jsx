import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  render() {
    const { productName, productImage,
      productPrice, productId, handleClick } = this.props;
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
          onClick={ handleClick }
          id={ productId }
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
  handleClick: PropTypes.func.isRequired,
};

export default Product;
