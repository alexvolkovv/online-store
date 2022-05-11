import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import universalSort from "../../../utils/universalSort";
import DataInfo from "../DataInfo/DataInfo";
import CharacteristicsStore from "../../../store/CharacteristicsStore";
import categoriesStore from "../../../store/CategoriesStore";
import characteristicsStore from "../../../store/CharacteristicsStore";
import ChangeCharacteristics from "../../../Modals/ChangeCharacteristic/ChangeCharacteristics";
import {Button} from "react-bootstrap";

const AdminCharacteristics = observer(() => {
  const [showModal, setShowModal] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  function sort(param, asc) {
    universalSort(param, CharacteristicsStore.characteristics, CharacteristicsStore.setCharacteristics.bind(CharacteristicsStore), asc)
  }

  function rowClick(characteristic) {
    characteristicsStore.setChangingCharacteristic(characteristic)
    setShowModal(true)
    setIsAdd(false)
  }

  function closeModal() {
    characteristicsStore.setChangingCharacteristic(null)
    setShowModal(false)
  }

  function addClick() {
    setIsAdd(true)
    setShowModal(true)
  }

  return (
    <div style={{width: '100%'}}>

      <Button onClick={addClick}>Добавить</Button>
      <DataInfo
        data={CharacteristicsStore.characteristics}
        rowClick={rowClick}
        sort={sort}
        deletingColumns={[

        ]}
      />

      <ChangeCharacteristics
        show={showModal}
        onHide={closeModal}
        isAdd={isAdd}
      />
    </div>
  );
});

export default AdminCharacteristics;