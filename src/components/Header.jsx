import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';
import styles from '../modules/Header.module.css';
import MenuBar from './MenuBar/MenuBar';

function Header() {
  const [hiddenMenu, setHiddenMenu] = useState(false);

  return (
    <header className={ styles.header }>
      <h1>
        <FaStore />
        Online Store
      </h1>
      <nav className={ styles.nav }>
        <Link to="/"><AiOutlineHome /></Link>
        <button
          type="button"
          className={ styles.navButton }
          onClick={ () => setHiddenMenu(!hiddenMenu) }
        >
          <BiMenuAltRight />
        </button>
      </nav>
      <aside
        className={ hiddenMenu ? styles.activeMenu : styles.menu }
      >
        <div className={ styles.menuContainer }>
          <MenuBar setHiddenMenu={ setHiddenMenu } hiddenMenu={ hiddenMenu } />
        </div>
      </aside>
    </header>
  );
}

export default Header;
