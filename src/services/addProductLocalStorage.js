import { getProductsFromId } from './api';

export default async function addProductLocalStorage(productId) {
  const response = await getProductsFromId(productId);
  localStorage.setItem('cart', JSON.stringify(response));
}
