export default async function addProductLocalStorage(product) {
  localStorage.setItem('cart', JSON.stringify(product));
}
