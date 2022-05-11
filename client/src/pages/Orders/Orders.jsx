import React, {useEffect, useState} from 'react';
import styles from './Orders.module.css'
import {observer} from "mobx-react-lite";
import OrderStore from "../../store/OrderStore";
import Order from "./Order/Order";
import {useLocation} from "react-router-dom";
import UserStore from "../../store/UserStore";
import Loader from "../../components/Loader/Loader";
import DataInfo from "../Admin/DataInfo/DataInfo";
import adminOrderStore from "../../store/Admin/AdminOrderStore";
import universalSort from "../../utils/universalSort";
import orderStore from "../../store/OrderStore";
import OrderAPI from "../../API/OrderAPI";
import adminStatusStore from "../../store/Admin/AdminStatusStore";
import ChangeOrder from "../../Modals/ChangeOrder/ChangeOrder";

const Orders = observer(() => {
  const location = useLocation()
  const userId = UserStore.user.id
  const [loading, setLoading] = useState(true)
  const [clickedOrder, setClickedOrder] = useState({})
  const [productsFromOrder, setProductsFromOrder] = useState([])
  const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    OrderStore.fetchAllOrders(userId).finally(() => {
      setLoading(false)
    })
  }, [])

  function sortOrders(param, asc) {
    universalSort(param, OrderStore.orders, OrderStore.setOrders.bind(OrderStore), asc)
  }

  function rowClick(order) {
    OrderAPI.getProductsFromOrder(order.id).then(data => {
      setClickedOrder(order)
      setProductsFromOrder(data)
    }).finally(data => {
      setModalVisible(true)
    })
  }

  return (
    <div>
      <div className="wrap" style={{textAlign: 'center'}}>
        <h2>Все заказы ({OrderStore.orders.length})</h2>
        <DataInfo
          data={OrderStore.orders}
          rowClick={rowClick}
          sort={sortOrders}
          deletingColumns={['client_id', 'order_status']}
          columnNames={[
            {
              newName: 'Номер заказа',
              oldName: 'id'
            },
            {
              newName: 'Дата заказа',
              oldName: 'order_date'
            },
            {
              newName: 'Цена заказа',
              oldName: 'price'
            },
            {
              newName: 'Статус заказа',
              oldName: 'status_name'
            }
          ]}
        />
      </div>
      <ChangeOrder
        products={productsFromOrder}
        order={clickedOrder}
        show={modalVisible}
        onHide={() => {
          setModalVisible(false)
        }}
        isCancel={true}
      />
    </div>
  );
});

export default Orders;