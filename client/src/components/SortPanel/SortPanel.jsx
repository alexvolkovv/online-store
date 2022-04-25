import React, {useMemo, useState} from 'react';
import MySelect from "../../UI/MySelect/MySelect";
import ProductsStore from "../../store/ProductsStore";
import {observer} from "mobx-react-lite";

const SortPanel = observer(() => {
  const [selectedSort, setSelectedSort] = useState('price')

  ProductsStore.setSortedProducts(useMemo(() => {
    console.log('products', ProductsStore.products)
    console.log('sortedproducts', ProductsStore.sortedProducts.length)
    console.log('filter', ProductsStore.filter.searchQuery)
    console.log('filter', ProductsStore.filter.selectedSort)

    switch (selectedSort) {
      case 'product_name':
        return [...ProductsStore.sortedProducts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
      case 'price':
        return [...ProductsStore.sortedProducts].sort((a, b) => a[selectedSort] - b[selectedSort])
    }

    return ProductsStore.sortedProducts
  }, [ProductsStore.filter, ProductsStore.products]))


  function sortProducts(sort) {
    setSelectedSort(sort)
    // ProductsStore.setSortedProducts(ProductsStore.products)
    ProductsStore.setFilter({...ProductsStore.filter, selectedSort: selectedSort})

    // switch (sort) {
    //   case 'product_name':
    //     ProductsStore.setSortedProducts([...ProductsStore.products].sort((a, b) => a[sort].localeCompare(b[sort])))
    //     return
    //   case 'price':
    //     ProductsStore.setSortedProducts([...ProductsStore.products].sort((a, b) => a[sort] - b[sort]))
    //     return
    // }
    //
    // ProductsStore.setSortedProducts(ProductsStore.products)
  }

  return (
    <div>
      <h4>Сортировка</h4>
      <MySelect
        defaultValue={'Сортировка'}
        options={[
          {name: 'Название', value: 'product_name'},
          {name: 'Цена', value: 'price'}

        ]}
        value={selectedSort}
        onChange={sortProducts}
      />
    </div>
  );
});

export default SortPanel;