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
import SuppliesStore from "../../store/SuppliesStore";
import StockStore from "../../store/StockStore";
import SupplierStore from "../../store/SupplierStore";
import {cutString} from "../../utils/cutString";
import SupplyAPI from "../../API/SupplyAPI";


const ChangeSupply = observer((props) => {
  const {show, onHide, isAdd} = props

  function clickProduct(productInfo, clickedProduct) {
    let changedCharArr = SuppliesStore?.changingSupplyProducts?.map((info) => {
      if (info.fakeId === productInfo.fakeId) {
        return {...info, product_id: clickedProduct.id, product_name: clickedProduct.product_name}
      }
      return info
    })
    SuppliesStore.setChangingSupplyProducts(changedCharArr)
  }

  
  // function checkAddingProductValues() {
  //   if (
  //     !ProductsStore.changingProduct.product_name ||
  //     !ProductsStore.changingProduct.description ||
  //     !ProductsStore.changingProduct.article ||
  //     !ProductsStore.changingProductLists.category.id ||
  //     !ProductsStore.changingProductLists.brand.id
  //     ) {
  //     return false
  //   }
  //
  //   return true
  // }
  //
  // function checkRepeatedInfoValues() {
  //   for (const changingProductInfoElement of ProductsStore.changingProductInfo) {
  //     const countInArr = ProductsStore.changingProductInfo.filter(item => item.id === changingProductInfoElement.id)
  //
  //     if (countInArr.length > 1) {
  //       return false
  //     }
  //   }
  //
  //   return true
  // }

  function createProduct() {
    // if (!checkAddingProductValues()) {
    //   alert('Проверьте правильность вводимых данных (одно из обязательных полей не заполнено)')
    //   return
    // }
    //
    // if (!checkRepeatedInfoValues()) {
    //   alert('Одна или несколько характеристик повторяются')
    //
    //   return
    // }
    if (isAdd) {
      console.log('adding')
      console.log(JSON.stringify(SuppliesStore.changingSupplyInfo))
      SupplyAPI.create({
        supply: {...SuppliesStore.changingSupply.supply, price: SuppliesStore.changingSupplyProducts.reduce((prev, current) => {
            return prev + (current.product_count * current.price)
          }, 0)},
        products: SuppliesStore.changingSupplyProducts,
        info: SuppliesStore.changingSupplyInfo
      }).then(data => {
        SuppliesStore.fetchSupplies()
        onHide()
      })
    } else {
      console.log(JSON.stringify(SuppliesStore.changingSupply))
      SupplyAPI.change({
        supply: {...SuppliesStore.changingSupply.supply, price: SuppliesStore.changingSupplyProducts.reduce((prev, current) => {
            return prev + (current.product_count * current.price)
          }, 0)},
        products: SuppliesStore.changingSupplyProducts,
        info: SuppliesStore.changingSupplyInfo
      }).then(data => {
        SuppliesStore.fetchSupplies()
        onHide()
      })
    }


    // console.log(JSON.stringify(ProductsStore.changingProduct))
    // console.log(JSON.stringify(ProductsStore.changingProductLists))
    // console.log(JSON.stringify(ProductsStore.changingProductInfo))
    // console.log(ProductsStore.changingFile)

  }

  function deleteProduct() {
    console.log(JSON.stringify(SuppliesStore.changingSupply))
    SupplyAPI.delete(SuppliesStore.changingSupply.supply.id)
      .then(data => {
        if (data.error) {
          alert(data.error)
          return;
        }

        SuppliesStore.fetchSupplies()
        onHide()
      })
  }

  function changeValue(productInfo, newValue, changedValue) {
    let changedCharArr = SuppliesStore?.changingSupplyProducts?.map((info) => {
      if (info.fakeId === productInfo.fakeId) {
        return {...info, [changedValue]: newValue}
      }
      return info
    })

    console.log(changedCharArr)
    SuppliesStore.setChangingSupplyProducts(changedCharArr)
  }

  function addNewInfo() {
    SuppliesStore.setChangingSupplyProducts([...SuppliesStore?.changingSupplyProducts, {
      fakeId: Date.now() + Math.random(),
      product_id: 0,
      price: 0,
      product_count: 0,
      product_name: ""
    }])
  }

  function removeInfo(productInfo) {
    let changedCharArr = SuppliesStore.changingSupplyProducts.filter(info => (info.fakeId !== productInfo.fakeId))

    SuppliesStore.setChangingSupplyProducts(changedCharArr)
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
          {isAdd ? 'Добавление' : 'Информация '}
        </Modal.Title>
        {!isAdd && <Button variant={'outline-danger'} onClick={deleteProduct}>Удалить</Button>}
      </Modal.Header>
      <Modal.Body>
        <h4>Основная информация</h4>
        <Form>
          <Form.Text>Дата поставки</Form.Text>
          <Form.Control
            disabled={!isAdd}
            type={'date'}
            placeholder={'Дата поставки'}
            value={SuppliesStore?.changingSupply?.supply?.supply_date.slice(0, 10)}
            onChange={(event) => {
              SuppliesStore.setChangingSupply({...SuppliesStore.changingSupply, supply: {...SuppliesStore.changingSupply.supply, supply_date: event.target.value}})
            }}
          />
        <Form.Text>
          Склад/Поставщик
        </Form.Text>
        <div style={{display: 'flex'}}>
          <Dropdown className={'mb-2 mr-2'}>
            <Dropdown.Toggle disabled={!isAdd}>
              {SuppliesStore?.changingSupplyInfo?.stock?.stock_name || 'Выберите склад'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {StockStore.stocks?.map(stock => (
                <Dropdown.Item
                  onClick={() => {
                    SuppliesStore.setChangingSupplyInfo({...SuppliesStore.changingSupplyInfo, stock})
                  }}
                  key={stock.id}
                >
                  {stock.stock_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{marginLeft: '10px'}}>
            <Dropdown.Toggle disabled={!isAdd}>
              {SuppliesStore?.changingSupplyInfo?.supplier?.supplier_name || 'Выберите поставщика'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {SupplierStore?.suppliers?.map(supplier => (
                <Dropdown.Item
                  onClick={() => {
                    SuppliesStore.setChangingSupplyInfo({...SuppliesStore.changingSupplyInfo, supplier})
                  }}
                  key={supplier.id}
                >
                  {supplier?.supplier_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <h4 className={'mb-4'}>Товары</h4>
          {SuppliesStore?.changingSupplyProducts?.map(product => (
            <Row key={product.fakeId} className={'mb-4 align-items-end'} >
              <Col md={4}>
                <Dropdown style={{marginLeft: '10px'}}>
                  <Dropdown.Toggle disabled={!isAdd}>
                    {product?.product_name.length > 20 ?
                      cutString(product?.product_name, 20) :
                      product?.product_name ||
                      'Выберите товар'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {ProductsStore?.products?.map(clickedProduct => (
                      <Dropdown.Item

                        onClick={() => {clickProduct(product, clickedProduct)}}
                        key={clickedProduct?.id}
                      >
                        {clickedProduct?.product_name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={3}>
                <Form.Text>Цена за 1 шт.</Form.Text>
                <Form.Control
                  disabled={!isAdd}
                  type={'number'}
                  aria-valuemin={0}
                  placeholder={'Цена за 1 шт.'}
                  value={product.price}
                  onChange={(event) => {
                    changeValue(product, event.target.value, 'price')
                  }}
                />
              </Col>

              <Col md={3}>
                <Form.Text>Количество</Form.Text>
                <Form.Control
                  disabled={!isAdd}
                  type={'number'}
                  placeholder={'Количество'}
                  value={product.product_count}
                  onChange={(event) => {
                    changeValue(product, event.target.value, 'product_count')
                  }}
                />
              </Col>
              <Col md={2}>
                <Button
                  disabled={!isAdd}
                  variant={'outline-dark'}
                  onClick={() => {removeInfo(product)}}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
          <Button
            className={''}
            disabled={!isAdd}
            variant={'outline-dark'}
            onClick={addNewInfo}
          >
            Добавить
          </Button>
        </div>
          <h2>Итого: {SuppliesStore.changingSupplyProducts.reduce((prev, current) => {
            return prev + (current.product_count * current.price)
          }, 0)}Р</h2>
      </Form>

      </Modal.Body>
      <Modal.Footer>

        {/*<Button variant={'danger'} onClick={onHide}>Отмена</Button>*/}
        {isAdd &&
          <Button variant={'outline-success'} onClick={createProduct}>Добавить</Button>}
        {/*  <Button variant={'outline-success'} onClick={createProduct}>Сохранить</Button>}*/}
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeSupply;