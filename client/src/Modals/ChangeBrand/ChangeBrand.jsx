import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import brandsStore from "../../store/BrandsStore";
import BrandsAPI from "../../API/BrandsAPI";


const ChangeBrand = observer((props) => {
  const {show, onHide, isAdd} = props

  function deleteBrand() {
    BrandsAPI.delete(brandsStore.changingBrand.id).then(data => {
      if (data.error) {
        alert(data.error)

        return
      }
      brandsStore.fetchBrands()
      onHide()
    })
  }

  function checkValue() {
    if (!brandsStore.changingBrand.brand_name) {
      return false
    }

    return true
  }

  function createBrand() {

    if (!checkValue()) {
      alert('Проверьте правильность введенных данных')
      return
    }

    if (isAdd) {
      BrandsAPI.create(brandsStore.changingBrand).then(data => {
        brandsStore.fetchBrands()
        onHide()
      })
    } else {
      BrandsAPI.change(brandsStore.changingBrand).then(data => {
        brandsStore.fetchBrands()
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
          {isAdd ? 'Добавление бренда' : 'Информация о бренде'}
        </Modal.Title>
        {!isAdd && <Button variant={'outline-danger'} onClick={deleteBrand}>Удалить бренд</Button>}
      </Modal.Header>
      <Modal.Body>
        <h4>Основная информация</h4>
        <Form>
        <Form.Text>
          Название бренда
        </Form.Text>
        <Form.Control
          className={'mb-3'}
          placeholder={'Название бренда'}
          value={brandsStore.changingBrand?.brand_name}
          onChange={(event) => {
            brandsStore.setChangingBrand({...brandsStore.changingBrand, brand_name: event.target.value})
          }}
        />
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'danger'} onClick={onHide}>Отмена</Button>
        <Button variant={'outline-success'} onClick={createBrand}>{isAdd ? 'Добавить бренд' : 'Сохранить'}</Button> :
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeBrand;