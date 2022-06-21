import React, { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import OnlineStoreContext from '../../context/OnlineStoreContext';
import styles from '../../modules/MenuBar.module.css';

function FavMenu() {
  const { favorites, setFavorites } = useContext(OnlineStoreContext);
  const removeFavorite = (item) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== item.id);
    setFavorites([...newFavorites]);
  };
  const MAX_NAME_LENGTH = 20;

  return (
    <div className={ styles.favMenu }>
      <ul className={ styles.listFav }>
        { favorites.length > 0 ? favorites.map((favItem) => (
          <li key={ favItem.id } className={ styles.itensFav }>
            <AiOutlineClose
              className={ styles.deleteItem }
              onClick={ () => removeFavorite(favItem) }
            />
            <div className={ styles.imgContent }>
              <img src={ favItem.thumbnail } alt={ favItem.title } />
            </div>
            <span>{`${favItem.title.substr(0, MAX_NAME_LENGTH)}...`}</span>
            <span>{ `R$ ${favItem.price}` }</span>
          </li>
        )) : <p>Não há itens nos seus favoritos!</p> }
      </ul>
    </div>
  );
}

export default FavMenu;
