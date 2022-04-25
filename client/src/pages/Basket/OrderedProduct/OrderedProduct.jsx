import React, {useState} from 'react';
import styles from './OrderedProduct.module.css'
import {PATH_HOST} from "../../../utils/Paths";
import MyInput from "../../../UI/MyInput/MyInput";
import MyButton from "../../../UI/MyButton/MyButton";
import OrderStore from "../../../store/OrderStore";
import {observer} from "mobx-react-lite";
import OrderAPI from "../../../API/OrderAPI";

const OrderedProduct = observer((props) => {
  const {product} = props

  console.log(Object.keys(product))
  console.log(product.product_name, product.max_count)

  const [productCount, setProductCount] = useState(product?.product_count)
  console.log(OrderStore.orderedProducts[0].product_count)

  function changeProductCount() {
    OrderAPI.changeProductCountInOrder(product, OrderStore.currentOrder).then(data => {
      console.log(data)
    })
  }


  console.log(product.product_name)
  return (
    <div className={styles.product}>
      <div className={styles.info}>
        <img width={100} height={100} src={PATH_HOST + '/' + product.image} alt=""/>

        <div className={styles.text}>
          <div className={styles.name}>{product.product_name}</div>
          <div className={styles.price}>{product.price} Р</div>
          <MyButton
            style={{marginTop: '10px', padding: '0'}}
            onClick={() => {
              console.log(product.id)
              console.log(OrderStore.currentOrder.id)
              OrderAPI.deleteProductFromOrder(product, OrderStore.currentOrder).then(data => {
                OrderStore.setOrderedProducts(OrderStore.orderedProducts.filter((orderedProduct) => product.id !== orderedProduct.id))
              })
            }}
          >
            Удалить
          </MyButton>

        </div>
      </div>
      <div className="actions">
        <div>Количество:</div>
        <MyInput
          style={{marginTop: '15px', width: '80px'}}
          value={product.product_count}
          type={'number'}
          onChange={(e) => {
            if (+e.target.value > 0 && +e.target.value <= +product.max_count) {
              product.product_count = e.target.value
              console.log(product.max_count)
            }
          }}
          onBlur={changeProductCount}
        />
      </div>

      <div className={styles.sum}>
        Сумма: {product.product_count * product.price} Р
      </div>

    </div>
  );
});

export default OrderedProduct;