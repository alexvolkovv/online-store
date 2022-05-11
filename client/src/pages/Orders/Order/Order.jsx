import React, {useState} from 'react';
import styles from './Order.module.css'
import MyButton from "../../../UI/MyButton/MyButton";
import OrderAPI from "../../../API/OrderAPI";
import OrderStore from "../../../store/OrderStore";
import UserStore from "../../../store/UserStore";

const cancelButtonStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)'
}

const Order = (props) => {
  const {order} = props
  const [isCancelling, setIsCancelling] = useState(false)
  const date = new Date(order.order_date)
  const day = date.getUTCDate() + 1
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  const cancelOrder = () => {
    setIsCancelling(true)
    OrderAPI.changeOrderStatus(order.id, 5)
      .then(data => {
        if (data.error) {
          alert(data.error)
          throw new Error(data.error)
        }

        setIsCancelling(false)
      })
      .then(data => {
        return OrderStore.fetchAllOrders(UserStore.user.id)
      })
      .then(data => {
        alert('Заказ успешно отменен')
      })

  }

  const stringDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  return (
    <div className={styles.order}>
      <div>{order.id}</div>
      <div>{stringDate}</div>
      <div>{order.price} Р</div>
      <div>{order.status_name}</div>

      {+order.order_status < 5 &&
        <MyButton
          style={cancelButtonStyle}
          onClick={cancelOrder}
        >
          Отменить
        </MyButton>
      }

    </div>
  );
};

export default Order;