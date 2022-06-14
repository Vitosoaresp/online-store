import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';
import { getProductsFromId } from '../services/api';
import styles from '../modules/ProductDetails.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';

function ProductDetails({ match }) {
  const { handleClick } = useContext(OnlineStoreContext);
  const [detailsProduct, setDetailsProduct] = useState({
    id: '',
    name: '',
    price: '',
    image: '',
    email: '',
    message: '',
    rating: '',
  });
  const [listRating, setListRating] = useState(
    JSON.parse(localStorage.getItem('rating')) || [],
  );

  useEffect(() => {
    const getId = async () => {
      const { params: { id } } = match;
      const product = await getProductsFromId(id);
      const { thumbnail, title, price } = product;
      setDetailsProduct({ ...detailsProduct, id, name: title, price, image: thumbnail });
    };
    getId();
  }, []);

  const getRating = ({ target }) => {
    const { name, value } = target;
    setDetailsProduct({ ...detailsProduct, [name]: value });
  };

  const saveRating = () => {
    const { email, message, rating } = detailsProduct;
    const previousRating = {
      email,
      message,
      rating,
    };
    setListRating([...listRating, previousRating]);
    setDetailsProduct({ ...detailsProduct, email: '', message: '', rating: '' });
  };

  useEffect(() => {
    localStorage.setItem('rating', JSON.stringify(listRating));
  }, [listRating]);

  const { name, price, image, id, email, message, rating } = detailsProduct;
  return (
    <div className={ styles.container }>
      <div className={ styles.productContainer }>
        <div className={ styles.productImage }>
          <img src={ image } alt={ name } />
        </div>
        <div className={ styles.productInfo }>
          <p data-testid="product-detail-name">{name}</p>
          <p>{`R$${price}`}</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ handleClick }
            id={ id }
            className={ styles.addToCart }
          >
            Adicione ao carrinho
          </button>
        </div>
      </div>
      <div className={ styles.ratingContainer }>
        <h2> Avaliações</h2>
        <div className={ styles.emailAndRating }>
          <label htmlFor="email">
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              value={ email }
              onChange={ getRating }
              placeholder="Email"
              className={ styles.email }
            />
          </label>
          <label htmlFor="rating" className={ styles.rating }>
            <input
              checked={ rating === '1' }
              type="radio"
              value="1"
              id="rating"
              name="rating"
              onChange={ getRating }
              data-testid="1-rating"
            />
            <AiFillStar />
          </label>
          <label htmlFor="rating2" className={ styles.rating }>
            <input
              checked={ rating === '2' }
              type="radio"
              value="2"
              id="rating2"
              name="rating"
              onChange={ getRating }
              data-testid="2-rating"
            />
            <AiFillStar />
          </label>
          <label htmlFor="rating3" className={ styles.rating }>
            <input
              checked={ rating === '3' }
              type="radio"
              value="3"
              id="rating3"
              name="rating"
              onChange={ getRating }
              data-testid="3-rating"
            />
            <AiFillStar />
          </label>
          <label htmlFor="rating4" className={ styles.rating }>
            <input
              checked={ rating === '4' }
              type="radio"
              value="4"
              id="rating4"
              name="rating"
              onChange={ getRating }
              data-testid="4-rating"
            />
            <AiFillStar />
          </label>
          <label htmlFor="rating5" className={ styles.rating }>
            <input
              checked={ rating === '5' }
              type="radio"
              value="5"
              id="rating5"
              name="rating"
              onChange={ getRating }
              data-testid="5-rating"
            />
            <AiFillStar />
          </label>
        </div>
        <label htmlFor="message">
          <textarea
            data-testid="product-detail-evaluation"
            name="message"
            value={ message }
            onChange={ getRating }
            placeholder="Mensagem(opcional)"
            rows="4"
            cols="50"
          />
        </label>
        <button
          data-testid="submit-review-btn"
          type="submit"
          onClick={ saveRating }
          disabled={ !email.length && !rating.length }
        >
          Avaliar
        </button>
      </div>
      <div className={ styles.ratingText }>
        <ul>
          {listRating.map((item, index) => (
            <li key={ index }>
              <p>{item.email}</p>
              <p>{item.message}</p>
              <p>{item.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
