import React, { useContext } from 'react';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../modules/ProductCard.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';

function Product({ productName, productImage, productPrice, productId,
  handleClick, freeShipping, availableQuantity }) {
  const {
    addProductToFavorites, productList,
    favorites, setFavorites } = useContext(OnlineStoreContext);

  const clickAddToFav = () => {
    const product = productList.find((item) => item.id === productId);
    const productFavorites = favorites.find((item) => item.id === productId);
    if (productFavorites) {
      const deleteProduct = favorites.filter((item) => item.id !== productId);
      setFavorites([...deleteProduct]);
    } else {
      addProductToFavorites(product);
    }
  };

  return (
    <div data-testid="product" className={ styles.productCard }>
      <Link
        data-testid="product-detail-link"
        to={ `/product/${productId}` }
        className={ styles.productBody }
      >
        <div className={ styles.productImage }>
          <img
            alt="imagem do produto"
            src={ productImage }
          />
        </div>
        <div className={ styles.productInfo }>
          <h2 className={ styles.productName }>{productName}</h2>
          <p className={ styles.productPrice }>{`R$${productPrice}`}</p>
          { freeShipping && <span>FRETE GRÁTIS</span> }
        </div>
      </Link>
      <div className={ styles.productActions }>
        { favorites.find((item) => item.id === productId) ? (
          <MdFavorite
            className={ styles.productFavoriteActive }
            onClick={ clickAddToFav }
          />
        ) : (
          <MdOutlineFavoriteBorder
            className={ styles.productFavorite }
            onClick={ clickAddToFav }
          />
        )}
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
    </div>
  );
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
