import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import ChangeSupply from "../../../Modals/ChangeSupply/ChangeSupply";
import ProductsAPI from "../../../API/ProductsAPI";
import ProductsStore from "../../../store/ProductsStore";
import BrandsStore from "../../../store/BrandsStore";
import CategoriesStore from "../../../store/CategoriesStore";
import universalSort from "../../../utils/universalSort";
import {Button} from "react-bootstrap";
import DataInfo from "../DataInfo/DataInfo";
import SuppliesStore from "../../../store/SuppliesStore";
import SupplyAPI from "../../../API/SupplyAPI";
import StockStore from "../../../store/StockStore";
import SupplierStore from "../../../store/SupplierStore";

const AdminSupplies = observer(() => {
  const [modalVisible, setModalVisible] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    SuppliesStore.fetchSupplies()
  }, [])

  function rowClick(supply) {
    SupplyAPI.getOne(supply.id)
      .then(data => {
        console.log(JSON.stringify(StockStore.stocks))
        console.log(JSON.stringify(SupplierStore.suppliers))

        console.log(data)
        SuppliesStore.setChangingSupply(data)
        SuppliesStore.setChangingSupplyInfo({
          stock: {
            id: data.supply.stock_id,
            stock_name: data.supply.stock_name,
            address: data.supply.address
          },
          supplier: {
            id: data.supply.supplier_id,
            supplier_name: data.supply.supplier_name,
            phone_number: data.supply.phone_number
          }
        })
        console.log(SuppliesStore?.changingSupply?.supply?.supply_date.slice(0, 10))
        SuppliesStore.setChangingSupplyProducts(data.products.map(product => {return {...product, fakeId: Date.now() + Math.random()}}))
        console.log(JSON.stringify(SuppliesStore.changingSupplyProducts))

        setIsAdd(false)
        setModalVisible(true)
      })
  }

  function addClick() {
    setModalVisible(true)
    setIsAdd(true)
  }

  function closeModal() {
    setModalVisible(false)

    setTimeout(() => {
      SuppliesStore.setChangingSupplyProducts([])
      SuppliesStore.setChangingSupplyInfo({})
      SuppliesStore.setChangingSupply({
        price: 0
      })
    }, 200)
  }

  function sort(param, asc) {
    universalSort(param, SuppliesStore.supplies, SuppliesStore.setSupplies.bind(SuppliesStore), asc)
  }

  return (
    <div style={{width: '100%'}}>
      <Button onClick={addClick}>Добавить поставку</Button>
      <DataInfo
        data={SuppliesStore.supplies}
        rowClick={rowClick}
        sort={sort}
        deletingColumns={[
          'stock_id',
          'supplier_id'
        ]}
      />

      <ChangeSupply
        show={modalVisible}
        onHide={closeModal}
        isAdd={isAdd}
      />
    </div>
  );
});

export default AdminSupplies;