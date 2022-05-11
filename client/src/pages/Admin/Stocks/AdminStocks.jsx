import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import universalSort from "../../../utils/universalSort";
import DataInfo from "../DataInfo/DataInfo";
import StockStore from "../../../store/StockStore";
import ChangeStock from "../../../Modals/ChangeStock/ChangeStock";
import stockStore from "../../../store/StockStore";
import {Button} from "react-bootstrap";

const AdminStocks = observer(() => {
  const [showModal, setShowModal] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    StockStore.fetchStocks()
  }, [])

  function sort(param, asc) {
    universalSort(param, StockStore.stocks, StockStore.setStocks.bind(StockStore), asc)
  }

  function rowClick(stock) {
    stockStore.setChangingStock(stock)
    setShowModal(true)
    setIsAdd(false)
  }

  function closeModal() {
    stockStore.setChangingStock(null)
    setShowModal(false)
  }

  function addClick() {
    setIsAdd(true)
    setShowModal(true)
  }

  return (
    <div style={{width: '100%'}}>
      <Button onClick={addClick}>Добавить склад</Button>

      <DataInfo
        data={StockStore.stocks}
        rowClick={rowClick}
        sort={sort}
        deletingColumns={[

        ]}
      />

      <ChangeStock
        show={showModal}
        onHide={closeModal}
        isAdd={isAdd}
      />
    </div>
  );
});

export default AdminStocks;