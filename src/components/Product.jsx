import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  render() {
    const {
      productName,
      productImage,
      productPrice,
      productId,
      handleClick,
      freeShipping,
      availableQuantity,
    } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product/${productId}` }>
          <h2>{productName}</h2>
          <img alt="imagem do produto" src={ productImage } />
          {freeShipping && (
            <span data-testid="free-shipping">frete grátis</span>
          )}
          <p>{`R$${productPrice}`}</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ handleClick }
          id={ productId }
          disabled={ availableQuantity === 0 }
        >
          Adicione ao carrinho
        </button>
      </div>
    );
  }
}

Product.defaultProps = {
  availableQuantity: 1,
};

Product.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  freeShipping: PropTypes.bool.isRequired,
  availableQuantity: PropTypes.number,
};

export default Product;
