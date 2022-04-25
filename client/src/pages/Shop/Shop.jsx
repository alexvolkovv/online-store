import React from 'react';
import styles from './Shop.module.css'
import Categories from "../../components/Categories/Categories";
import ProductsPanel from "../../components/ProductsPanel/ProductsPanel";
import {observer} from "mobx-react-lite";
import SortPanel from "../../components/SortPanel/SortPanel";

const Shop = observer(() => {
  return (
    <div className={styles.shop}>
      <div>
        <Categories/>
        <SortPanel/>
      </div>
      <ProductsPanel/>
    </div>
  );
});

export default Shop;