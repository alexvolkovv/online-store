import React, {useEffect, useState} from 'react';
import styles from './Basket.module.css'
import OrderAPI from "../../API/OrderAPI";
import {Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import OrderStore from "../../store/OrderStore";
import OrderedProduct from "./OrderedProduct/OrderedProduct";
import MyButton from "../../UI/MyButton/MyButton";

const Basket = observer(() => {
  const location = useLocation()
  const userId = location.pathname.split('/').reverse()[0]
  return (
    <div>
      <h2>Заказ</h2>
      <div>
        {!OrderStore.orderedProducts.length ? <div>Товаров нет</div> : OrderStore.orderedProducts.map(product => (
          <OrderedProduct key={product.id} product={product}/>
        ))}
      </div>
      <div className={styles.result}>
        <h2>Итог: {OrderStore.orderedProducts.reduce((prev, current) => {
          return prev + (current.price * current.product_count)
        }, 0)} Р</h2>
        <MyButton>Оформить заказ</MyButton>
      </div>
    </div>
  );
});

export default Basket;