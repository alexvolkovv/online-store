import React, {useMemo, useState} from 'react';
import MySelect from "../../UI/MySelect/MySelect";
import ProductsStore from "../../store/ProductsStore";
import {observer} from "mobx-react-lite";
import {Dropdown, Form} from "react-bootstrap";
import BrandsStore from "../../store/BrandsStore";
import MyInput from "../../UI/MyInput/MyInput";
import ProductsAPI from "../../API/ProductsAPI";

const SortPanel = observer(() => {
  const [selectedSort, setSelectedSort] = useState('price')

  function sortProducts(sort) {
    setSelectedSort(sort)
    ProductsStore.setFilter({...ProductsStore.filter, selectedSort: sort})
    ProductsAPI.get(ProductsStore.filter).then(products => {
      ProductsStore.setProducts(products)
      ProductsStore.setSortedProducts(products)
    })
  }

  return (
    <div>
      <h4>Сортировка</h4>
      <MySelect
        defaultValue={'Цена'}
        options={[
          {name: 'Название', value: 'product_name'},
          {name: 'Цена', value: 'price'}
        ]}
        value={selectedSort}
        onChange={sortProducts}
      />
      <Form className={'mt-4'}>
        <h5>Цена</h5>
        <Form.Control
          placeholder={'от'}
          type={'number'}
          value={ProductsStore.filter.priceFrom}
          onChange={(event) => {ProductsStore.setFilter({...ProductsStore.filter, priceFrom: event.target.value})}}
        />
        <Form.Control
          className={'mt-3'}
          placeholder={'до'}
          value={ProductsStore.filter.priceTo}
          type={'number'}
          onChange={(event) => {ProductsStore.setFilter({...ProductsStore.filter, priceTo: event.target.value})}}
        />
      </Form>
    </div>
  );
});

export default SortPanel;