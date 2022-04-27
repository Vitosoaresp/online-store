import { getProductsFromId } from './api';

export default async function addProductLocalStorage(productId) {
  const responseProduct = await getProductsFromId(productId);
  localStorage.setItem('cart', JSON.stringify(responseProduct));
}
