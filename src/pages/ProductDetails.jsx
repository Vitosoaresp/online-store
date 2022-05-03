import React from 'react';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';
import { getProductsFromId } from '../services/api';
import styles from '../modules/ProductDetails.module.css';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      price: '',
      image: '',
      email: '',
      message: '',
      rating: '',
      lastRating: JSON.parse(localStorage.getItem('rating')) || [],
    };
  }

  componentDidMount() {
    this.getId();
  }

  getId = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const ProductId = id;
    this.setState({ id: ProductId }, async () => {
      await this.getProductInfo();
    });
  };

  getProductInfo = async () => {
    const { id } = this.state;
    const product = await getProductsFromId(id);
    this.setState({
      price: product.price,
      name: product.title,
      image: product.thumbnail,
    });
  };

  getRating = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
    );
  }

  saveRating = () => {
    const { email, message, rating } = this.state;
    const previousRating = {
      email,
      message,
      rating,
    };
    this.setState((prevState) => ({
      lastRating: [...prevState.lastRating, previousRating],
    }), () => {
      const { lastRating } = this.state;
      localStorage.setItem('rating', JSON.stringify(lastRating));
      this.setState({ email: '', message: '', rating: '' });
    });
  }

  render() {
    const {
      name,
      price,
      image,
      id,
      email,
      message,
      rating,
      lastRating,
    } = this.state;

    const { handleClick } = this.props;
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
                onChange={ this.getRating }
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
                onChange={ this.getRating }
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
                onChange={ this.getRating }
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
                onChange={ this.getRating }
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
                onChange={ this.getRating }
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
                onChange={ this.getRating }
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
              onChange={ this.getRating }
              placeholder="Mensagem(opcional)"
              rows="4"
              cols="50"
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="submit"
            onClick={ this.saveRating }
          >
            Avaliar
          </button>
        </div>
        <div className={ styles.ratingText }>
          <ul>
            {lastRating.map((item, index) => (
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
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProductDetails;
