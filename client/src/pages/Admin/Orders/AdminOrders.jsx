import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import adminOrderStore from "../../../store/Admin/AdminOrderStore";
import DataInfo from "../DataInfo/DataInfo";
import universalSort from "../../../utils/universalSort";
import ChangeOrder from "../../../Modals/ChangeOrder/ChangeOrder";
import OrderAPI from "../../../API/OrderAPI";
import adminStatusStore from "../../../store/Admin/AdminStatusStore";

const AdminOrders = observer(() => {
  const [modalVisible, setModalVisible] = useState(false)
  const [clickedOrder, setClickedOrder] = useState({})
  const [productsFromOrder, setProductsFromOrder] = useState([])

  function rowClick(order) {
    OrderAPI.getProductsFromOrder(order.id).then(data => {
      setClickedOrder(order)
      setProductsFromOrder(data)
    }).finally(data => {
      setModalVisible(true)
    })
  }

  function sortOrders(param, asc) {
    universalSort(param, adminOrderStore.orders, adminOrderStore.setOrders.bind(adminOrderStore), asc)
  }

  return (
    <div style={{width: '100%'}}>
      <DataInfo
        data={adminOrderStore.orders}
        rowClick={rowClick}
        sort={sortOrders}
        deletingColumns={[]}
      />
      <ChangeOrder
        products={productsFromOrder}
        order={clickedOrder}
        show={modalVisible}
        onHide={() => {
          setModalVisible(false)
          adminStatusStore.setSelectedStatus(null)
        }}
        isChange={true}
      />
    </div>
  );
});

export default AdminOrders;