import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import { BiCategoryAlt } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';
import styles from '../modules/Header.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';

function Header() {
  const { cartLength, setHiddenMenu, hiddenMenu } = useContext(OnlineStoreContext);
  return (
    <header className={ styles.header }>
      <h1>
        <FaStore />
        Online Store
      </h1>
      <div className={ styles.nav }>
        <Link to="/"><AiOutlineHome /></Link>
        <div className={ styles.cartContainer }>
          <Link to="/cart" data-testid="shopping-cart-button">
            <BsFillCartFill />
          </Link>
          <span data-testid="shopping-cart-size">{cartLength}</span>
        </div>
        <div className={ styles.menuContainer }>
          <button
            type="button"
            onClick={ () => setHiddenMenu(!hiddenMenu) }
          >
            <BiCategoryAlt />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
