import React, {useEffect, useState} from 'react';
import styles from './Basket.module.css'
import OrderAPI from "../../API/OrderAPI";
import {Link, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import OrderStore from "../../store/OrderStore";
import OrderedProduct from "./OrderedProduct/OrderedProduct";
import MyButton from "../../UI/MyButton/MyButton";
import ProductsStore from "../../store/ProductsStore";

const Basket = observer(() => {
  const location = useLocation()
  const userId = location.pathname.split('/').reverse()[0]
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [basketLoading, setBasketLoading] = useState(false)

  function confirm() {
    setConfirmLoading(true)
    OrderAPI.confirmOrder(OrderStore.orderedProducts, OrderStore.currentOrder)
      .then(newOrder => {
        if (newOrder.error) {
        alert(newOrder.error)

        newOrder.blockedProducts.forEach((blockedProduct) => {
          OrderStore.orderedProducts.forEach((orderProduct, index) => {
            if (orderProduct.id === blockedProduct.id) {
              OrderStore.orderedProducts[index].max_count = 0
            }
          })
        })
        return
      }

      OrderStore.setCurrentOrder(newOrder)
      OrderStore.setOrderedProducts([])
      alert('Заказ успешно сформирован')
    })
    .finally(() => {
      setConfirmLoading(false)
    })
  }
  return (
    <div>
      <h1>Заказ</h1>
      <div>
        {!OrderStore.orderedProducts.length ? <h2 style={{textAlign: 'center', marginTop: '20vh'}}>Товаров нет</h2> : OrderStore.orderedProducts.map(product => (
          <OrderedProduct key={product.id} product={product}/>
        ))}
      </div>
      {!!OrderStore.orderedProducts.length &&
        <div className={styles.result}>
          <h2>Итог: {OrderStore.orderedProducts.reduce((prev, current) => {
            return prev + (current.price * current.product_count)
          }, 0)} Р</h2>
          <MyButton onClick={confirm}>{confirmLoading ? 'Оформление...' : 'Оформить заказ'}</MyButton>
        </div>
      }
    </div>
  );
});

export default Basket;