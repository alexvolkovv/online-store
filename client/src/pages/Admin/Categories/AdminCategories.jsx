import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import DataInfo from "../DataInfo/DataInfo";
import BrandsStore from "../../../store/BrandsStore";
import CategoriesStore from "../../../store/CategoriesStore";
import universalSort from "../../../utils/universalSort";
import ChangeBrand from "../../../Modals/ChangeBrand/ChangeBrand";
import brandsStore from "../../../store/BrandsStore";
import categoriesStore from "../../../store/CategoriesStore";
import {Button} from "react-bootstrap";
import ChangeCategories from "../../../Modals/ChangeCategories/ChangeCategories";

const AdminCategories = observer(() => {
  const [showModal, setShowModal] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  function sortCategories(param, asc) {
    universalSort(param, CategoriesStore.categories, CategoriesStore.setCategories.bind(CategoriesStore), asc)
  }

  function rowClick(category) {
    console.log(category)
    categoriesStore.setChangingCategory(category)
    setShowModal(true)
    setIsAdd(false)
  }

  function closeModal() {
    categoriesStore.setChangingCategory(null)
    setShowModal(false)
  }

  function addClick() {
    setIsAdd(true)
    setShowModal(true)
  }
  return (
    <div style={{width: '100%'}}>
      <Button onClick={addClick}>Добавить категорию</Button>

      <DataInfo
        data={CategoriesStore.categories}
        rowClick={rowClick}
        sort={sortCategories}
        deletingColumns={[

        ]}
      />

      <ChangeCategories
        show={showModal}
        onHide={closeModal}
        isAdd={isAdd}
      />
    </div>
  );
});

export default AdminCategories;