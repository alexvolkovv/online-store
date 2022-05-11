import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import categoriesStore from "../../store/CategoriesStore";
import CategoriesAPI from "../../API/CategoriesAPI";
import CategoriesStore from "../../store/CategoriesStore";
import stockStore from "../../store/StockStore";
import StockAPI from "../../API/StockAPI";
import StockStore from "../../store/StockStore";


const ChangeStock = observer((props) => {
  const {show, onHide, isAdd} = props
  function deleteCategory() {
    StockAPI.delete(stockStore.changingStock.id).then(data => {
      if (data.error) {
        alert(data.error)
        return
      }

      StockStore.fetchStocks()
      onHide()
    })
  }

  function isValuesNull() {
    return !stockStore.changingStock?.stock_name || !stockStore.changingStock?.address;
  }

  function createCategory() {
    if (isValuesNull()) {
      alert('Заполните все поля')
      console.log(JSON.stringify(stockStore.changingStock))
      return
    }

    if (isAdd) {
      StockAPI.create(stockStore.changingStock).then(data => {
        if (data.error) {
          alert(data.error)
          return
        }

        stockStore.fetchStocks()
        onHide()
      })
    } else {
      StockAPI.change(stockStore.changingStock).then(data => {
        stockStore.fetchStocks()
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
        {!isAdd && <Button variant={'outline-danger'} onClick={deleteCategory}>Удалить</Button>}
      </Modal.Header>
      <Modal.Body>
        <h4>Основная информация</h4>
        <Form>
          <Form.Text>
            Название склада
          </Form.Text>
          <Form.Control
            className={'mb-3'}
            placeholder={'Адрес склада'}
            value={stockStore.changingStock?.stock_name}
            onChange={(event) => {
              stockStore.setChangingStock({...stockStore.changingStock, stock_name: event.target.value})
            }}
          />
          <Form.Text>
            Адрес склада
          </Form.Text>
          <Form.Control
            className={'mb-3'}
            placeholder={'Адрес'}
            value={stockStore.changingStock?.address}
            onChange={(event) => {
              stockStore.setChangingStock({...stockStore.changingStock, address: event.target.value})
            }}
          />
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'danger'} onClick={onHide}>Отмена</Button>
        <Button variant={'outline-success'} onClick={createCategory}>{isAdd ? 'Добавить' : 'Сохранить'}</Button> :
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeStock;