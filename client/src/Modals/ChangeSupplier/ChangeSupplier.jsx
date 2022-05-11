import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import categoriesStore from "../../store/CategoriesStore";
import CategoriesAPI from "../../API/CategoriesAPI";
import CategoriesStore from "../../store/CategoriesStore";
import stockStore from "../../store/StockStore";
import StockAPI from "../../API/StockAPI";
import StockStore from "../../store/StockStore";
import supplierStore from "../../store/SupplierStore";
import SupplierAPI from "../../API/SupplierAPI";
import SupplierStore from "../../store/SupplierStore";


const ChangeSupplier = observer((props) => {
  const {show, onHide, isAdd} = props

  function deleteSupplier() {
    SupplierAPI.delete(supplierStore.changingSupplier.id).then(data => {
      if (data.error) {
        alert(data.error)
        return
      }

      SupplierStore.fetchSuppliers()
      onHide()
    })
  }

  function isValuesNull() {
    return !supplierStore.changingSupplier?.supplier_name || !supplierStore.changingSupplier?.phone_number;
  }

  function create() {
    if (isValuesNull()) {
      alert('Заполните все поля')
      return
    }

    if (isAdd) {
      SupplierAPI.create(supplierStore.changingSupplier).then(data => {
        if (data.error) {
          alert(data.error)
          return
        }

        supplierStore.fetchSuppliers()
        onHide()
      })
    } else {
      SupplierAPI.change(supplierStore.changingSupplier).then(data => {
        supplierStore.fetchSuppliers()
        onHide()
      })
    }
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
          {isAdd ? 'Добавление' : 'Информация'}
        </Modal.Title>
        {!isAdd && <Button variant={'outline-danger'} onClick={deleteSupplier}>Удалить</Button>}
      </Modal.Header>
      <Modal.Body>
        <h4>Основная информация</h4>
        <Form>
          <Form.Text>
            Поставщик
          </Form.Text>
          <Form.Control
            className={'mb-3'}
            placeholder={'Поставщик'}
            value={supplierStore.changingSupplier?.supplier_name}
            onChange={(event) => {
              supplierStore.setChangingSupplier({...supplierStore.changingSupplier, supplier_name: event.target.value})
            }}
          />
          <Form.Text>
            Номер телефона
          </Form.Text>
          <Form.Control
            className={'mb-3'}
            placeholder={'Номер телефона'}
            value={supplierStore.changingSupplier?.phone_number}
            onChange={(event) => {
              supplierStore.setChangingSupplier({...supplierStore.changingSupplier, phone_number: event.target.value})
            }}
          />
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'danger'} onClick={onHide}>Отмена</Button>
        <Button variant={'outline-success'} onClick={create}>{isAdd ? 'Добавить' : 'Сохранить'}</Button> :
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeSupplier;