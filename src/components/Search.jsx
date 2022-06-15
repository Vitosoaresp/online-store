import React, { useContext, useEffect, useState } from 'react';
import OnlineStoreContext from '../context/OnlineStoreContext';

function Search() {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('sale');
  const { searchProduct, productList, setProductList } = useContext(OnlineStoreContext);

  useEffect(() => {
    if (productList) {
      if (order === 'sale') {
        const sortedList = productList.sort((a, b) => b.sold_quantity - a.sold_quantity);
        setProductList([...sortedList]);
      } else if (order === 'asc') {
        const sortedList2 = productList.sort((a, b) => a.price - b.price);
        setProductList([...sortedList2]);
      } else if (order === 'desc') {
        const sortedList3 = productList.sort((a, b) => b.price - a.price);
        setProductList([...sortedList3]);
      }
    }
  }, [order]);

  const sumbitSearch = () => {
    searchProduct(search, '');
    setSearch('');
  };

  return (
    <>
      <div>
        <input
          data-testid="query-input"
          name="search"
          type="text"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
          placeholder="Digite algum termo de pesquisa ou escolha uma categoria..."
        />
        <label htmlFor="order">
          Ordernar por
          <select
            name="order"
            id="order"
            value={ order }
            onChange={ ({ target }) => setOrder(target.value) }
          >
            <option value="sale">Mais vendidos</option>
            <option value="desc">Maior preço</option>
            <option value="asc">Menor preço</option>
          </select>
        </label>
      </div>
      <button
        onClick={ sumbitSearch }
        type="button"
        data-testid="query-button"
      >
        Buscar
      </button>
    </>
  );
}

export default Search;
