import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import styles from './Cart.module.css';

class Cart extends React.Component {
  finishPurchase = () => {
    const { history } = this.props;
    history.push('/checkout');
  }

  render() {
    const { cartList, handleClick, decrementQuantity } = this.props;
    console.log(cartList);
    return (
      <div className={ styles.container }>
        <section className={ styles.container_title }>
          <AiOutlineShoppingCart className={ styles.container_title_icon } />
          <h1>Carrinho de Compras</h1>
        </section>
        <main className={ styles.main }>
          { cartList.length > 0 ? (
            cartList.map((product) => (
              <div className={ styles.product } key={ product.id }>
                <img src={ product.thumbnail } alt={ product.title } />
                <p data-testid="shopping-cart-product-name">
                  { product.title }
                </p>
                <p className={ styles.price }>{`R$ ${product.price}`}</p>
                <section className={ styles.quantity }>
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
                    disabled={ product.quantity >= product.available_quantity }
                  >
                    +
                  </button>
                </section>

              </div>
            ))

          ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        </main>
        <section className={ styles.final }>
          <h2>
            Valor total da compra: R$
            {}
            {cartList.reduce(
              (acc, item) => (acc + (item.price * item.quantity)), 0,
            ).toFixed(2)}

          </h2>
          <button
            type="button"
            data-testid="checkout-products"
            onClick={ () => this.finishPurchase() }
          >
            Finalizar a compra
          </button>
        </section>

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
