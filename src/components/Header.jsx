import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import styles from '../modules/Header.module.css';

class Header extends React.Component {
  render() {
    const { cartLength } = this.props;
    const cartIcon = <BsFillCartFill />;
    return (
      <header className={ styles.header }>
        <h1>Front-end Online Store</h1>
        <div className={ styles.nav }>
          <Link to="/"><AiOutlineHome /></Link>
          <div className={ styles.cartContainer }>
            <Link to="/cart" data-testid="shopping-cart-button">
              {cartIcon}
            </Link>
            <span data-testid="shopping-cart-size">{cartLength}</span>
          </div>

        </div>
      </header>
    );
  }
}

Header.propTypes = {
  cartLength: PropTypes.number.isRequired,
};

export default Header;
