import React from 'react';
import PropTypes from 'prop-types';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      adiciona: false,
    };
  }

handleClick = ({ target }) => {
  console.log(target);
}

render() {
  const { productName, productImage, productPrice } = this.props;
  return (
    <div data-testid="product">
      <h2>{ productName }</h2>
      <img alt="imagem do produto" src={ productImage } />
      <p>
        {`R$${productPrice}`}
      </p>
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
  // handleClick: PropTypes.func.isRequired,
};

export default Product;
