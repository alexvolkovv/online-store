import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import DataInfo from "../DataInfo/DataInfo";
import ProductsStore from "../../../store/ProductsStore";
import UserStore from "../../../store/UserStore";
import ProductsAPI from "../../../API/ProductsAPI";
import BrandsStore from "../../../store/BrandsStore";
import CategoriesStore from "../../../store/CategoriesStore";
import universalSort from "../../../utils/universalSort";
import ChangeUser from "../../../Modals/ChangeUser/ChangeUser";

const AdminUsers = observer(() => {
  const [modalVisible, setModalVisible] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  function rowClick(user) {
    setModalVisible(true)
    UserStore.setChangingUser(user)
    console.log(user)
  }

  function closeModal() {
    setModalVisible(false)
  }

  function sortProducts(param, asc) {
    universalSort(param, UserStore.users, UserStore.setUsers.bind(UserStore), asc)
  }

  return (
    <div style={{width:'100%'}}>
      <DataInfo
        data={UserStore.users}
        rowClick={rowClick}
        sort={sortProducts}
        deletingColumns={[
          'description',
          'image',
          'brand_id',
          'category_id'
        ]}
      />
      <ChangeUser
        show={modalVisible}
        onHide={closeModal}
      />
    </div>
  );
});

export default AdminUsers;