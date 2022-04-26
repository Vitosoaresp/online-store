import React from 'react';
import PropTypes from 'prop-types';

class Product extends React.Component {
  render() {
    const { productName, productImage, productPrice } = this.props;
    return (
      <div data-testid="product">
        <h2>{ productName }</h2>
        <img alt="imagem do produto" src={ productImage } />
        <p>
          {`R$${productPrice}`}
        </p>
      </div>
    );
  }
}

Product.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
};

export default Product;
