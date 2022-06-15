import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromId } from '../services/api';
import styles from '../modules/ProductDetails.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';

function ProductDetails({ match }) {
  const { handleClick } = useContext(OnlineStoreContext);
  const [detailsProduct, setDetailsProduct] = useState({
    title: '',
    price: '',
    image: '',
    soldQuantity: '',
    condition: '',
  });
  const [attributes, setAttributes] = useState({
    marca: '',
    modelo: '',
    condicao: '',
  });

  useEffect(() => {
    const getId = async () => {
      const { params: { id } } = match;
      const product = await getProductsFromId(id);
      console.log(product);
      const { pictures, sold_quantity: soldQuantity } = product;
      setDetailsProduct({
        soldQuantity, image: pictures[0].url, ...product,
      });
    };
    getId();
  }, []);

  useEffect(() => {
    if (detailsProduct.attributes) {
      const marca = detailsProduct.attributes
        .find((attribute) => attribute.name === 'Marca');
      const modelo = detailsProduct.attributes
        .find((attribute) => attribute.name === 'Modelo');
      const condicao = detailsProduct.attributes
        .find((attribute) => attribute.name === 'Condição do item');
      setAttributes({
        marca: marca.value_name,
        modelo: modelo.value_name,
        condicao: condicao.value_name });
    }
  }, [detailsProduct]);

  const { title, price, image, id, soldQuantity } = detailsProduct;
  return (
    <div className={ styles.container }>
      <div className={ styles.productContainer }>
        <div className={ styles.productImage }>
          <img src={ image } alt={ title } />
        </div>
        <div className={ styles.productInfo }>
          <div className={ styles.productStats }>
            <span>{`${attributes.condicao}`}</span>
            <hr />
            <span>{`${soldQuantity} Vendas`}</span>
          </div>
          <p data-testid="product-detail-name">{title}</p>
          <p>{`R$${price}`}</p>
          <div className={ styles.productDetails }>
            <p>{`Marca: ${attributes.marca}`}</p>
            <p>{`Modelo: ${attributes.modelo}`}</p>
            { detailsProduct.warranty && <p>{detailsProduct.warranty}</p> }
          </div>
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
