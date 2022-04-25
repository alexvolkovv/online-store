import React, {useState, useEffect} from 'react';
import styles from './Brands.module.css'
import BrandsStore from "../../../store/BrandsStore";
import {observer} from "mobx-react-lite";
import ProductsStore from "../../../store/ProductsStore";
import ProductsAPI from "../../../API/ProductsAPI";
import {Link, useNavigate} from "react-router-dom";

const Brands = observer(() => {
  const navigate = useNavigate()

  return (
    <div className={styles.brands}>
      {BrandsStore.brands?.map(brand => (
        <div
          key={brand.id}
          className={[styles.brand, brand?.id === ProductsStore.filter.brand?.id && styles.active].join(' ')}
          onClick={() => {
            if (ProductsStore.filter.brand?.id === brand?.id) {
              // setSelectedBrand(null)
              ProductsStore.setFilter({...ProductsStore.filter, brand: null})
              return
            }


            // setSelectedBrand(brand)
            ProductsStore.setFilter({...ProductsStore.filter, brand: brand})
          }}
        >
          {brand.brand_name}
        </div>
      ))}
    </div>
  );
});

export default Brands;