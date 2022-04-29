import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  finishPurchase = () => {
    const { history } = this.props;
    history.push('/checkout');
  }

  render() {
    const { cartList, handleClick, decrementQuantity } = this.props;
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
              <button
                id={ product.id }
                type="button"
                onClick={ decrementQuantity }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
              <button
                id={ product.id }
                type="button"
                onClick={ handleClick }
                data-testid="product-increase-quantity"
              >
                +
              </button>
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
  handleClick: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
};

export default Cart;
