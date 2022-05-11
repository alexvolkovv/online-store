import React, {useEffect} from 'react';
import Links from "./Links/Links";
import styles from './Admin.module.css'
import {Routes, Route, useLocation} from "react-router-dom";
import {adminLinks, mainAdminLinks} from "../../utils/AdminLinks";
import adminOrderStore from "../../store/Admin/AdminOrderStore";
import adminStatusStore from "../../store/Admin/AdminStatusStore";
import characteristicsStore from "../../store/CharacteristicsStore";
import StockStore from "../../store/StockStore";
import ProductsStore from "../../store/ProductsStore";
import supplierStore from "../../store/SupplierStore";
import suppliesStore from "../../store/SuppliesStore";
import userStore from "../../store/UserStore";
import UserStore from "../../store/UserStore";

const Admin = () => {
  const location = useLocation()

  useEffect(() => {
    adminOrderStore.fetchOrders()
    adminStatusStore.fetchStatuses()
    characteristicsStore.fetchCharacteristics()
    StockStore.fetchStocks()
    ProductsStore.fetchProducts()
    supplierStore.fetchSuppliers()
    suppliesStore.fetchSupplies()
    userStore.fetchUsers()
  }, [])

  return (
    <div style={{width: '100%'}}>
      <h2 style={{textAlign: 'center'}}>Админ-панель</h2>
      <div className={styles.admin}>
        <Links/>
        <Routes>
          {adminLinks.map(link => (
            <Route key={link.path} path={link.path} element={link.element} exact={true}/>
          ))}
          {userStore.user.role == 3 && mainAdminLinks.map(link => (
            <Route key={link.path} path={link.path} element={link.element} exact={true}/>
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default Admin;