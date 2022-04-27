import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      price: '',
      image: '',
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

  render() {
    const { name, price, image } = this.state;
    return (
      <div>
        {' '}
        <Link to="/cart" data-testid="shopping-cart-button">Cart</Link>

        <div>
          <img src={ image } alt={ name } />
          <p data-testid="product-detail-name">{name}</p>
          <p>{`R$${price}`}</p>
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
};

export default ProductDetails;
