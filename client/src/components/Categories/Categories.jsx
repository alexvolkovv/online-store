import React, {useState} from 'react';
import styles from './Categories.module.css'
import {observer} from "mobx-react-lite";
import CategoriesStore from "../../store/CategoriesStore";
import ProductsStore from "../../store/ProductsStore";

const Categories = observer(() => {

  return (
    <div className={styles.categories}>
      {CategoriesStore.categories?.map(category => (
        <div
          key={category.id}
          className={[styles.category, ProductsStore.filter.category?.id === category?.id && styles.active].join(' ')}
          onClick={() => {
            if (ProductsStore.filter.category?.id === category?.id) {
              ProductsStore.setFilter({...ProductsStore.filter, category: null})
              return
            }

            ProductsStore.setFilter({...ProductsStore.filter, category: category})
          }}
        >
          {category.category_name}
        </div>
      ))}

    </div>
  );
});

export default Categories;