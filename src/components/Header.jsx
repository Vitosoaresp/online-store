import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import styles from '../modules/Header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={ styles.header }>
        <h1>Front-end Online Store</h1>
        <Link to="/"><AiOutlineHome /></Link>
      </header>
    );
  }
}

export default Header;
