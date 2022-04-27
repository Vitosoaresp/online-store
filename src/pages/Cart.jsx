import React from 'react';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    this.loadingProductLocalStorage();
  }

  loadingProductLocalStorage = () => {
    const productList = JSON.parse(localStorage.getItem('cart'));
    if (productList) {
      this.setState({
        productList,
      });
    }
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        { productList.length > 0 ? (
          productList.map((product) => (
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
      </div>
    );
  }
}

export default Cart;
