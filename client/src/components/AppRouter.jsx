import React from 'react';
import {Routes, Route} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {
  PATH_ADMIN,
  PATH_ALL_ORDERS,
  PATH_BASKET,
  PATH_LOGIN,
  PATH_PRODUCT_PAGE,
  PATH_REGISTRATION,
  PATH_SHOP
} from "../utils/Paths";
import Shop from "../pages/Shop/Shop";
import Product from "../pages/Product/Product";
import userStore from "../store/UserStore";
import Admin from "../pages/Admin/Admin";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Basket from "../pages/Basket/Basket";
import Orders from "../pages/Orders/Orders";
import Links from "../pages/Admin/Links/Links";

const AppRouter = observer(() => {
  return (
    <div style={{padding: '20px 40px'}}>
      <Routes>
        <Route path={PATH_SHOP} exact={true} element={<Shop/>}/>
        <Route path={PATH_PRODUCT_PAGE + '/:id'} exact={true} element={<Product/>}/>
        {!userStore.user && <Route path={PATH_LOGIN} exact={true} element={<Login/>}/>}
        {!userStore.user && <Route path={PATH_REGISTRATION} exact={true} element={<Registration/>}/>}

        {userStore.user && <Route path={PATH_BASKET + '/'} exact={true} element={<Basket/>}/>}
        {userStore.user && <Route path={PATH_ALL_ORDERS + '/:id'} exact={true} element={<Orders/>}/>}


        {userStore.user?.role > 1 && <Route path={PATH_ADMIN + '/*'} exact={true} element={<Admin/>}/>}


      </Routes>
    </div>
  );
});

export default AppRouter;