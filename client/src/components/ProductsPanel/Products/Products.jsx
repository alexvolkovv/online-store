import React from 'react';
import styles from './Products.module.css'
import ProductCard from "./ProductCard/ProductCard";
import {observer} from "mobx-react-lite";
import ProductsStore from "../../../store/ProductsStore";
import {Link, useNavigate} from "react-router-dom";
import {PATH_PRODUCT_PAGE} from "../../../utils/Paths";

const Products = observer(() => {
  console.log(ProductsStore.sortedProducts)
  const navigate = useNavigate()
  return (
    <div className={styles.products}>

      {!ProductsStore.sortedProducts?.length ? <h2>Товары не найдены</h2> : ProductsStore.sortedProducts?.map(product => (
        <ProductCard key={product.id} product={product} onClick={() => {
          navigate(PATH_PRODUCT_PAGE + '/' + product.id)
        }}/>
      ))}
    </div>
  );
});

export default Products;