import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import universalSort from "../../../utils/universalSort";
import DataInfo from "../DataInfo/DataInfo";
import StockStore from "../../../store/StockStore";
import ChangeStock from "../../../Modals/ChangeStock/ChangeStock";
import stockStore from "../../../store/StockStore";
import {Button} from "react-bootstrap";
import SupplierStore from "../../../store/SupplierStore";
import ChangeSupplier from "../../../Modals/ChangeSupplier/ChangeSupplier";

const AdminSupplier = observer(() => {
  const [showModal, setShowModal] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    SupplierStore.fetchSuppliers()
  }, [])

  function sort(param, asc) {
    universalSort(param, SupplierStore.suppliers, SupplierStore.setSuppliers.bind(SupplierStore), asc)
  }

  function rowClick(supplier) {
    SupplierStore.setChangingSupplier(supplier)
    setShowModal(true)
    setIsAdd(false)
  }

  function closeModal() {
    SupplierStore.setChangingSupplier(null)
    setShowModal(false)
  }

  function addClick() {
    setIsAdd(true)
    setShowModal(true)
  }

  return (
    <div style={{width: '100%'}}>
      <Button onClick={addClick}>Добавить поставщика</Button>

      <DataInfo
        data={SupplierStore.suppliers}
        rowClick={rowClick}
        sort={sort}
      />

      <ChangeSupplier
        show={showModal}
        onHide={closeModal}
        isAdd={isAdd}
      />
    </div>
  );
});

export default AdminSupplier;