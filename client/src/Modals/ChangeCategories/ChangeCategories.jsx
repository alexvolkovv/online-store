import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import brandsStore from "../../store/BrandsStore";
import BrandsAPI from "../../API/BrandsAPI";
import categoriesStore from "../../store/CategoriesStore";
import CategoriesAPI from "../../API/CategoriesAPI";
import CategoriesStore from "../../store/CategoriesStore";


const ChangeCategories = observer((props) => {
  const {show, onHide, isAdd} = props

  function deleteCategory() {
    CategoriesAPI.delete(CategoriesStore.changingCategory.id).then(data => {
      if (data.error) {
        alert(data.error)
        return
      }

      CategoriesStore.fetchCategories()
      onHide()
    })
  }

  function isValuesNull() {
    return !categoriesStore.changingCategory?.category_name;
  }

  function createCategory() {

    if (isValuesNull()) {
      alert('Заполните все поля')
      return
    }

    if (isAdd) {
      CategoriesAPI.create(CategoriesStore.changingCategory).then(data => {
        categoriesStore.fetchCategories()
        onHide()
      })
    } else {
      CategoriesAPI.change(CategoriesStore.changingCategory).then(data => {
        categoriesStore.fetchCategories()
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
          {isAdd ? 'Добавление категории' : 'Информация о категории'}
        </Modal.Title>
        {!isAdd && <Button variant={'outline-danger'} onClick={deleteCategory}>Удалить категорию</Button>}
      </Modal.Header>
      <Modal.Body>
        <h4>Основная информация</h4>
        <Form>
        <Form.Text>
          Название категории
        </Form.Text>
        <Form.Control
          className={'mb-3'}
          placeholder={'Название категории'}
          value={categoriesStore.changingCategory?.category_name}
          onChange={(event) => {
            categoriesStore.setChangingCategory({...categoriesStore.changingCategory, category_name: event.target.value})
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

export default ChangeCategories;