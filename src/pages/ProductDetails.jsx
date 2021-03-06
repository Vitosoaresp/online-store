import React, { useContext, useEffect, useState } from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import PropTypes from 'prop-types';
import { getProductsFromId } from '../services/api';
import styles from '../modules/ProductDetails.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';

function ProductDetails({ match }) {
  const {
    handleClick,
    favorites,
    addProductToFavorites,
    setFavorites,
  } = useContext(OnlineStoreContext);
  const [detailsProduct, setDetailsProduct] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [picturesGrid, setPicturesGrid] = useState([]);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [conditionItem, setConditionItem] = useState('');

  useEffect(() => {
    const getId = async () => {
      const { params: { id } } = match;
      const product = await getProductsFromId(id);
      const { pictures, sold_quantity: soldQuantity } = product;
      setDetailsProduct({
        soldQuantity, ...product,
      });
      pictures.map((picture) => setPicturesGrid((photos) => [...photos, picture.url]));
    };
    getId();
  }, [match]);

  useEffect(() => {
    if (detailsProduct.attributes) {
      const { attributes: atributos } = detailsProduct;
      atributos
        .map((attribute) => setAttributes(
          (attr) => ([...attr, { [attribute.name]: attribute.value_name }]),
        ));
      const cond = atributos.find((attribute) => attribute.id === 'ITEM_CONDITION');
      setConditionItem(cond.value_name);
    }
  }, [detailsProduct]);

  const handleClickPicture = (index) => {
    if (index === picturesGrid.length - 1) setPictureIndex(0);
    else setPictureIndex(index + 1);
  };

  const clickAddToFav = () => {
    const productFavorites = favorites.find((item) => item.id === detailsProduct.id);
    if (productFavorites) {
      const deleteProduct = favorites.filter((item) => item.id !== detailsProduct.id);
      setFavorites([...deleteProduct]);
    } else {
      addProductToFavorites(detailsProduct);
    }
  };

  const { title, price, id, soldQuantity } = detailsProduct;
  return (
    <div className={ styles.productContainer }>
      <div className={ styles.product }>
        <div className={ styles.productImage }>
          <img src={ picturesGrid[pictureIndex] } alt={ title } />
          <BsArrowRightCircle onClick={ () => handleClickPicture(pictureIndex) } />
        </div>
        <div className={ styles.productInfo }>
          { favorites.find((favorite) => favorite.id === id) ? (
            <MdFavorite onClick={ clickAddToFav } />
          ) : (
            <MdOutlineFavoriteBorder onClick={ clickAddToFav } />
          )}
          <div className={ styles.productStats }>
            <span>{`${conditionItem}`}</span>
            <hr />
            <span>{`${soldQuantity} Vendas`}</span>
          </div>
          <h2 className={ styles.productName }>{title}</h2>
          <p className={ styles.productPrice }>{`R$ ${price}`}</p>
          <p className={ styles.paymentMethod }>Ver os meios de pagamento</p>
          { detailsProduct.available_quantity > 0 && (
            <>
              <p className={ styles.availableQuantity }>Estoque dispon??vel</p>
              <span
                className={ styles.quantity }
              >
                {`(${detailsProduct.available_quantity} dispon??veis)`}

              </span>
            </>
          )}
          <div className={ styles.productDetails }>
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
      <div className={ styles.productAttributes }>
        <h2>Caracter??sticas do produto</h2>
        { attributes.length !== 0 && attributes.map((attribute) => (
          <p
            key={ Object.keys(attribute) }
          >
            {`${Object.keys(attribute)}: ${Object.values(attribute)}`}
          </p>
        )) }
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
