import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import OrderAPI from "../../API/OrderAPI";
import ProductInformation from "./ProductInformation";
import adminStatusStore from "../../store/Admin/AdminStatusStore";
import {observer} from "mobx-react-lite";
import AdminOrderStore from "../../store/Admin/AdminOrderStore";
import OrderStore from "../../store/OrderStore";

const ChangeOrder = observer((props) => {
  const {show, onHide, order, products, isChange, isCancel} = props

  function saveChanges() {
    if (adminStatusStore.selectedStatus !== null && +order.order_status !== adminStatusStore.selectedStatus.id) {
      OrderAPI.changeOrderStatus(order.id, adminStatusStore.selectedStatus.id)
        .then(data => {
          return AdminOrderStore.fetchOrders()
        })
        .then(data => {
          onHide()
        })
    } else {
      onHide()
    }
  }

  function cancelOrder() {
    OrderAPI.changeOrderStatus(order.id, 5)
      .then(data => {
        return OrderStore.fetchAllOrders(order.client_id)
      })
      .then(data => {
        onHide()
      })
  }


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{marginRight: '15px'}} id="contained-modal-title-vcenter">
          Заказ №{order.id}
        </Modal.Title>
        {isChange &&
          <Dropdown style={{marginLeft: '30px'}}>
            <Dropdown.Toggle>
              {adminStatusStore.selectedStatus?.status_name || 'Изменить статус заказа'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {adminStatusStore.statuses?.map(status => (
                <Dropdown.Item
                  onClick={() => {adminStatusStore.setSelectedStatus(status)}}
                  key={status.id}
                >
                  {status.status_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>}
        {isCancel && order.order_status < 5 && <Button variant={'danger'} onClick={cancelOrder}>Отменить заказ</Button>}
      </Modal.Header>
      <Modal.Body>
        {isChange && <h3>Клиент: {order.email}</h3>}
        <h4>Статус заказа: {order.status_name}</h4>
        {!products.length ? 'Товары были удалены' : products.map(product => (
          <ProductInformation key={product.id} product={product}/>
        ))}
        <h3 style={{marginTop: '15px', marginBottom: '15px'}}>Итого: {order.price} Р</h3>

      </Modal.Body>
      {isChange && <Modal.Footer>
        <Button variant={'danger'} onClick={onHide}>Отмена</Button>
        <Button variant={'outline-success'} onClick={saveChanges}>Сохранить</Button>
      </Modal.Footer>}
    </Modal>
  );
});

export default ChangeOrder;