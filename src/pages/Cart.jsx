import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  finishPurchase = () => {
    const { history } = this.props;
    history.push('/checkout');
  }

  render() {
    const { cartList } = this.props;
    return (
      <div>
        <Link to="/">Home</Link>
        { cartList.length > 0 ? (
          cartList.map((product) => (
            <div key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <p data-testid="shopping-cart-product-name">
                { product.title }
              </p>
              <p>{ product.price }</p>
              <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
            </div>
          ))
        ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ () => this.finishPurchase() }
        >
          Finalizar a compra
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Cart;
