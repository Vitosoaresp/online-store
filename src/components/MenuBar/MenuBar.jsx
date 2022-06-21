import React, { useContext, useState } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { CgCloseR } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import OnlineStoreContext from '../../context/OnlineStoreContext';
import styles from '../../modules/MenuBar.module.css';
import CartMenu from './CartMenu';
import FavMenu from './FavMenu';

function MenuBar({ setHiddenMenu }) {
  const history = useHistory();
  const { cartLength } = useContext(OnlineStoreContext);
  const [menuSelected, setMenuSelected] = useState('carrinho');

  const pushToCart = () => {
    setHiddenMenu(false);
    history.push('/cart');
  };

  const pushToCheckout = () => {
    setHiddenMenu(false);
    history.push('/checkout');
  };

  return (
    <div className={ styles.menuContainer }>
      <CgCloseR className={ styles.close } onClick={ () => setHiddenMenu(false) } />
      <div className={ styles.menuOptions }>
        <div className={ styles.menuCart }>
          <button
            type="button"
            onClick={ () => setMenuSelected('carrinho') }
            className={ menuSelected === 'carrinho' ? styles.active : '' }
          >
            <BsFillCartFill onClick={ () => pushToCart() } />
            <span data-testid="shopping-cart-size">{cartLength}</span>
            <h3>Carrinho de compras</h3>
          </button>
        </div>
        <hr />
        <div className={ styles.menuFavorites }>
          <button
            type="button"
            onClick={ () => setMenuSelected('favoritos') }
            className={ menuSelected === 'favoritos' ? styles.active : '' }
          >
            <h3>Favoritos</h3>
          </button>
        </div>
      </div>
      { menuSelected === 'carrinho' && <CartMenu push={ pushToCheckout } /> }
      { menuSelected === 'favoritos' && <FavMenu /> }
    </div>
  );
}

MenuBar.propTypes = {
  setHiddenMenu: PropTypes.func.isRequired,
};

export default MenuBar;
