import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import styles from '../modules/Header.module.css';

function Header({ cartLength }) {
  return (
    <header className={ styles.header }>
      <h1>Front-end Online Store</h1>
      <div className={ styles.nav }>
        <Link to="/"><AiOutlineHome /></Link>
        <div className={ styles.cartContainer }>
          <Link to="/cart" data-testid="shopping-cart-button">
            <BsFillCartFill />
          </Link>
          <span data-testid="shopping-cart-size">{cartLength}</span>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  cartLength: PropTypes.number.isRequired,
};

export default Header;
