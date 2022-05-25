import React, {useEffect, useMemo, useState} from 'react';
import styles from './ProductsPanel.module.css'
import MyInput from "../../UI/MyInput/MyInput";
import Brands from "./Brands/Brands";
import Products from "./Products/Products";
import ProductsStore from "../../store/ProductsStore";
import ProductsAPI from "../../API/ProductsAPI";
import {observer} from "mobx-react-lite";
import Loader from "../Loader/Loader";

const ProductsPanel = observer(() => {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  ProductsStore.setSortedProducts(useMemo(() => {
    return [...ProductsStore.sortedProducts].filter((product) => product.product_name.toLowerCase().includes(searchQuery))
  }, [ProductsStore.filter, ProductsStore.products]))

  useEffect(() => {

    setLoading(true)
    ProductsAPI.get({
      category_id: ProductsStore.filter.category?.id,
      brand_id: ProductsStore.filter.brand?.id,
      priceFrom: ProductsStore.filter?.priceFrom,
      priceTo: ProductsStore.filter?.priceTo,
      selectedSort: ProductsStore.filter?.selectedSort
    }).then(products => {
      ProductsStore.setProducts(products)
      ProductsStore.setSortedProducts(products)
    }).finally(() => {setLoading(false)})
  }, [ProductsStore.filter])


  return (
    <div className={styles.panel}>
      <MyInput
        onChange={(e) => {
          setSearchQuery(e.target.value)
          ProductsStore.setFilter({...ProductsStore.filter, searchQuery: searchQuery})
        }
      }
        value={searchQuery}
        style={{marginBottom: '15px'}}
        type={'text'}
        placeholder={'Поиск...'}
      />
      <Brands/>
      {loading ? <Loader style={{height: '50vh'}}/> : <Products/>}
    </div>
  );
});

export default ProductsPanel;