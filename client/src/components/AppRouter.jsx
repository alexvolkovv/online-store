import React from 'react';
import {Routes, Route} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {PATH_ADMIN, PATH_BASKET, PATH_LOGIN, PATH_PRODUCT_PAGE, PATH_REGISTRATION, PATH_SHOP} from "../utils/Paths";
import Shop from "../pages/Shop/Shop";
import Product from "../pages/Product/Product";
import userStore from "../store/UserStore";
import Admin from "../pages/Admin/Admin";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Basket from "../pages/Basket/Basket";

const AppRouter = observer(() => {
  return (
    <div style={{padding: '20px 40px'}}>
      <Routes>
        <Route path={PATH_SHOP} exact={true} element={<Shop/>}/>
        <Route path={PATH_PRODUCT_PAGE + '/:id'} exact={true} element={<Product/>}/>
        {!userStore.user && <Route path={PATH_LOGIN} exact={true} element={<Login/>}/>}
        {!userStore.user && <Route path={PATH_REGISTRATION} exact={true} element={<Registration/>}/>}

        {userStore.user && <Route path={PATH_BASKET + '/:id'} exact={true} element={<Basket/>}/>}

        {userStore.user?.role === 2 && <Route path={PATH_ADMIN} exact={true} element={<Admin/>}/>}

      </Routes>
    </div>
  );
});

export default AppRouter;