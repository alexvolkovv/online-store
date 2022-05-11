import React, {useState} from 'react';
import {Button, Col, Dropdown, Form, FormText, Modal, Row} from "react-bootstrap";
import ProductsStore from "../../store/ProductsStore";
import {observer} from "mobx-react-lite";
import adminStatusStore from "../../store/Admin/AdminStatusStore";
import BrandsStore from "../../store/BrandsStore";
import CategoriesStore from "../../store/CategoriesStore";
import characteristicsStore from "../../store/CharacteristicsStore";
import CharacteristicsStore from "../../store/CharacteristicsStore";
import ProductsAPI from "../../API/ProductsAPI";


const ChangeProduct = observer((props) => {
  const {show, onHide, isAdd} = props

  function clickCharacteristic(productInfo, clickedChar) {
    let changedCharArr = ProductsStore.changingProductInfo.map((info) => {
      if (info.fakeId === productInfo.fakeId) {
        return {...info, id: clickedChar.id}
      }
      return info
    })

    ProductsStore.setChangingProductInfo(changedCharArr)
  }

  function selectFile(event) {
    ProductsStore.setChangingFile(event.target.files[0])
  }
  
  function checkAddingProductValues() {
    if (
      !ProductsStore.changingProduct.product_name ||
      !ProductsStore.changingProduct.description ||
      !ProductsStore.changingProduct.article ||
      !ProductsStore.changingProductLists.category.id ||
      !ProductsStore.changingProductLists.brand.id
      ) {
      return false
    }

    return true
  }

  function checkRepeatedInfoValues() {
    for (const changingProductInfoElement of ProductsStore.changingProductInfo) {
      const countInArr = ProductsStore.changingProductInfo.filter(item => item.id === changingProductInfoElement.id)

      if (countInArr.length > 1) {
        return false
      }
    }

    return true
  }

  function createProduct() {
    if (!checkAddingProductValues()) {
      alert('Проверьте правильность вводимых данных (одно из обязательных полей не заполнено)')
      return
    }

    if (!checkRepeatedInfoValues()) {
      alert('Одна или несколько характеристик повторяются')

      return
    }

    const formData = new FormData()

    formData.append('name', ProductsStore.changingProduct.product_name)
    formData.append('article', ProductsStore.changingProduct.article)
    formData.append('description', ProductsStore.changingProduct.description)
    formData.append('price', ProductsStore.changingProduct.price)
    formData.append('category_id', ProductsStore.changingProductLists.category.id)
    formData.append('brand_id', ProductsStore.changingProductLists.brand.id)
    formData.append('info', JSON.stringify(ProductsStore.changingProductInfo))

    formData.append('img', ProductsStore.changingFile)
    if (isAdd) {
      ProductsAPI.create(formData).then(createdProduct => {
        return ProductsStore.fetchProducts()
      }).then(data => {
        onHide()
      })
    } else {
      ProductsAPI.update(ProductsStore.changingProduct.id, formData).then(data => {
        console.log(data)
        return ProductsStore.fetchProducts()
      }).then(data => {
        onHide()
      })
    }


    // console.log(JSON.stringify(ProductsStore.changingProduct))
    // console.log(JSON.stringify(ProductsStore.changingProductLists))
    // console.log(JSON.stringify(ProductsStore.changingProductInfo))
    // console.log(ProductsStore.changingFile)

  }

  function deleteProduct() {
    ProductsAPI.delete(ProductsStore.changingProduct.id)
      .then(data => {
        if (data.error) {
          alert(data.error)
          return;
        }

        ProductsStore.fetchProducts()
        onHide()
      })
  }

  function changeCharacteristicValue(productInfo, newValue) {
    let changedCharArr = ProductsStore.changingProductInfo.map((info) => {
      if (info.fakeId === productInfo.fakeId) {
        return {...info, info_value: newValue}
      }

      return info
    })

    ProductsStore.setChangingProductInfo(changedCharArr)
  }

  function addNewInfo() {
    ProductsStore.setChangingProductInfo([...ProductsStore.changingProductInfo, {
      fakeId: Date.now() + Math.random(),
      id: 0,
      info_value: '',
      info_name: ''
    }])
  }

  function removeInfo(productInfo) {
    let changedCharArr = ProductsStore.changingProductInfo.filter(info => (info.fakeId !== productInfo.fakeId))

    ProductsStore.setChangingProductInfo(changedCharArr)
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
          {isAdd ? 'Добавление товара' : 'Информация о товаре'}
        </Modal.Title>
        {!isAdd && <Button variant={'outline-danger'} onClick={deleteProduct}>Удалить товар</Button>}
      </Modal.Header>
      <Modal.Body>
        <h4>Основная информация</h4>
        <Form>
        <Form.Text>
          Название товара
        </Form.Text>
        <Form.Control
          className={'mb-3'}
          placeholder={'Название товара'}
          value={ProductsStore.changingProduct?.product_name}
          onChange={(event) => {
            console.log(event.target.value)
            ProductsStore.setChangingProduct({...ProductsStore.changingProduct, product_name: event.target.value})
          }}
        />
        <Form.Text>
          Описание товара
        </Form.Text>
        <Form.Control
          className={'mb-3'}
          placeholder={'Описание товара'}
          value={ProductsStore.changingProduct?.description}
          onChange={(event) => {
            console.log(event.target.value)
            ProductsStore.setChangingProduct({...ProductsStore.changingProduct, description: event.target.value})
          }}
        />
        <Form.Text>
          Артикул товара
        </Form.Text>
        <Form.Control
          type={'number'}
          className={'mb-3'}
          placeholder={'Артикул товара'}
          value={ProductsStore.changingProduct?.article}
          onChange={(event) => {
            console.log(event.target.value)
            ProductsStore.setChangingProduct({...ProductsStore.changingProduct, article: event.target.value})
          }}
        />
          <Form.Text>
            Цена товара
          </Form.Text>
          <Form.Control
            type={'number'}
            className={'mb-3'}
            placeholder={'Цена товара'}
            value={ProductsStore.changingProduct?.price}
            onChange={(event) => {
              console.log(event.target.value)
              ProductsStore.setChangingProduct({...ProductsStore.changingProduct, price: event.target.value})
            }}
          />
        <Form.Text>
          Бренд/Категория
        </Form.Text>
        <div style={{display: 'flex'}}>
          <Dropdown className={'mb-2 mr-2'}>
            <Dropdown.Toggle>
              {ProductsStore.changingProductLists?.brand.brand_name || 'Выберите бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {BrandsStore.brands?.map(brand => (
                <Dropdown.Item
                  onClick={() => {
                    ProductsStore.setChangingProductLists({...ProductsStore.changingProductLists, brand})
                  }}
                  key={brand.id}
                >
                  {brand.brand_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{marginLeft: '10px'}}>
            <Dropdown.Toggle>
              {ProductsStore.changingProductLists?.category?.category_name || 'Выберите категорию'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {CategoriesStore.categories?.map(category => (
                <Dropdown.Item
                  onClick={() => {
                    ProductsStore.setChangingProductLists({...ProductsStore.changingProductLists, category})
                  }}
                  key={category.id}
                >
                  {category.category_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Form.Text>
          Изображение
        </Form.Text>
        <Form.Control
          type={'file'}
          accept={".jpg, .jpeg, .png"}
          className={'mb-4'}
          onChange={selectFile}
        />
        <div>
          <h4 className={'mb-4'}>Характеристики</h4>
          {ProductsStore.changingProductInfo?.map(info => (
            <Row key={info.fakeId} className={'mb-4'}>
              <Col md={4}>
                <Dropdown style={{marginLeft: '10px'}}>
                  <Dropdown.Toggle>
                    {CharacteristicsStore.characteristics?.find(char => char?.id === info?.id)?.name || 'Выберите значение'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {CharacteristicsStore.characteristics?.map(char => (
                      <Dropdown.Item
                        onClick={() => {clickCharacteristic(info, char)}}
                        key={char?.id}
                      >
                        {char?.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={5}>
                <Form.Control
                  value={info?.info_value}
                  onChange={(event) => {
                    changeCharacteristicValue(info, event.target.value)
                  }}
                />
              </Col>
              <Col md={3}>
                <Button
                  variant={'outline-dark'}
                  onClick={() => {removeInfo(info)}}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
          <Button
            className={''}
            variant={'outline-dark'}
            onClick={addNewInfo}
          >
            Добавить
          </Button>
        </div>
      </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant={'danger'} onClick={onHide}>Отмена</Button>
        {isAdd ?
          <Button variant={'outline-success'} onClick={createProduct}>Добавить продукт</Button> :
          <Button variant={'outline-success'} onClick={createProduct}>Сохранить</Button>}
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeProduct;