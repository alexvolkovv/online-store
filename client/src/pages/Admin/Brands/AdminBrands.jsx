import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import DataInfo from "../DataInfo/DataInfo";
import ProductsStore from "../../../store/ProductsStore";
import BrandsStore from "../../../store/BrandsStore";
import universalSort from "../../../utils/universalSort";
import ChangeBrand from "../../../Modals/ChangeBrand/ChangeBrand";
import brandsStore from "../../../store/BrandsStore";
import {Button} from "react-bootstrap";

const AdminBrands = observer(() => {

  const [showModal, setShowModal] = useState(false)
  const [isAdd, setIsAdd] = useState(false)


  function sortBrands(param, asc) {
    universalSort(param, BrandsStore.brands, BrandsStore.setBrands.bind(BrandsStore), asc)
  }

  function rowClick(brand) {
    brandsStore.setChangingBrand(brand)
    setShowModal(true)
    setIsAdd(false)
  }

  function closeModal() {
    brandsStore.setChangingBrand(null)
    setShowModal(false)
  }

  function addClick() {
    setIsAdd(true)
    setShowModal(true)
  }

  return (
    <div style={{width: '100%'}}>
      <Button onClick={addClick}>Добавить бренд</Button>

      <DataInfo
        data={BrandsStore.brands}
        rowClick={rowClick}
        sort={sortBrands}
        columnNames={[
          {
            oldName: 'id',
            newName: 'Номер'
          },
          {
            oldName: 'brand_name',
            newName: 'Название'
          },
        ]}
      />

      <ChangeBrand
        show={showModal}
        onHide={closeModal}
        isAdd={isAdd}
      />
    </div>
  );
});

export default AdminBrands;