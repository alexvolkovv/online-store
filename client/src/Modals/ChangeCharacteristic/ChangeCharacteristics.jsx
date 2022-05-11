import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import brandsStore from "../../store/BrandsStore";
import BrandsAPI from "../../API/BrandsAPI";
import categoriesStore from "../../store/CategoriesStore";
import CategoriesAPI from "../../API/CategoriesAPI";
import CategoriesStore from "../../store/CategoriesStore";
import characteristicsStore from "../../store/CharacteristicsStore";
import CharacteristicsAPI from "../../API/CharacteristicsAPI";


const ChangeCharacteristics = observer((props) => {
  const {show, onHide, isAdd} = props

  function deleteChar() {
    CharacteristicsAPI.delete(characteristicsStore.changingCharacteristic.id).then(data => {
      if (data.error) {
        alert(data.error)
        return
      }

      characteristicsStore.fetchCharacteristics()
      onHide()
    })
  }

  function isValuesNull() {
    return !characteristicsStore.changingCharacteristic?.name;
  }

  function createCategory() {
    if (isValuesNull()) {
      alert('Заполните все поля')

      return
    }
    if (isAdd) {
      CharacteristicsAPI.create(characteristicsStore.changingCharacteristic).then(data => {

        characteristicsStore.fetchCharacteristics()
        onHide()
      })
    } else {
      CharacteristicsAPI.change(characteristicsStore.changingCharacteristic).then(data => {
        characteristicsStore.fetchCharacteristics()
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
        {!isAdd && <Button variant={'outline-danger'} onClick={deleteChar}>Удалить</Button>}
      </Modal.Header>
      <Modal.Body>
        <h4>Основная информация</h4>
        <Form>
        <Form.Text>
          Название харакетристики
        </Form.Text>
        <Form.Control
          className={'mb-3'}
          placeholder={'Название харакетристики'}
          value={characteristicsStore.changingCharacteristic?.name}
          onChange={(event) => {
            characteristicsStore.setChangingCharacteristic({...characteristicsStore.changingCharacteristic, name: event.target.value})
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

export default ChangeCharacteristics;