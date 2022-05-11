import React, {useEffect, useState} from 'react';
import styles from './Product.module.css'
import {Link, useLocation} from "react-router-dom";
import ProductsAPI from "../../API/ProductsAPI";
import {PATH_HOST} from "../../utils/Paths";
import MyButton from "../../UI/MyButton/MyButton";
import UserStore from "../../store/UserStore";
import OrderStore from "../../store/OrderStore";
import OrderAPI from "../../API/OrderAPI";

const Product = () => {
  const location = useLocation()
  const [dataProduct, setDataProduct] = useState({})
  const productId = location.pathname.split('/').reverse()[0]
  const [loading, setLoading] = useState(true)
  const [isOrdered, setIsOrdered] = useState(false)
  console.log('order', isOrdered)

  console.log()

  function addProductOrder() {
    if (OrderStore.orderedProducts.find((orderedProduct) => orderedProduct.id == productId)) {
      OrderAPI.deleteProductFromOrder(dataProduct.product, OrderStore.currentOrder).then(data => {
        OrderStore.setOrderedProducts(OrderStore.orderedProducts.filter((orderedProduct) => +orderedProduct.id !== +productId))
        setIsOrdered(false)
      })
    } else {
      console.log(Object.keys(OrderStore.currentOrder), Object.values(OrderStore.currentOrder))
      OrderAPI.addProductToOrder(dataProduct.product, OrderStore.currentOrder).then(data => {
        OrderStore.setOrderedProducts([...OrderStore.orderedProducts, {...dataProduct.product, product_count: 1}])
        setIsOrdered(true)
      })
    }
  }

  useEffect(() => {
    ProductsAPI.getOne(productId).then(data => {
      console.log(data)
      setDataProduct(data)
      setIsOrdered(OrderStore.orderedProducts?.find((orderedProduct) => +orderedProduct?.id === +productId))
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {loading ? 'Загрузка...' :
        <div className={styles.product}>
          <div className={styles.actions}>
            <img src={PATH_HOST + '/' + dataProduct?.product?.image} alt="Product image"/>
            <h1>{dataProduct.product?.product_name}</h1>
            <span className={styles.price}>Цена: {dataProduct.product.price} ₽</span>
            {
                Number(dataProduct.product.max_count) > 0 ?
                UserStore.user &&
                <MyButton
                  onClick={addProductOrder}
                >
                  {isOrdered ? 'В корзине' : 'Добавить в корзину'}
                </MyButton> :
                UserStore.user && <h3>Нет в наличии</h3>
            }
          </div>
          <div className={styles.about}>
            <h1>О товаре</h1>
            <p>{dataProduct.product.description}</p>
            <p>Артикул: {dataProduct.product.article}</p>
            <h2>Характеристики</h2>
            <div className={styles.info}>
              {dataProduct.productInfo.length === 0 ? <h3>Характеристик пока нету :(</h3> : dataProduct.productInfo?.map(information => (
                <div className={styles.oneInfo}>{information.info_name}: {information.info_value}</div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Product;