import React, {useEffect} from "react";
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import UserStore from "./store/UserStore";
import CategoriesAPI from "./API/CategoriesAPI";
import CategoriesStore from "./store/CategoriesStore";
import BrandsAPI from "./API/BrandsAPI";
import BrandsStore from "./store/BrandsStore";
import ProductsAPI from "./API/ProductsAPI";
import ProductsStore from "./store/ProductsStore";
import {observer} from "mobx-react-lite";
import OrderAPI from "./API/OrderAPI";
import OrderStore from "./store/OrderStore";

function App() {
  useEffect(() => {
    CategoriesAPI.get().then(data => {
      CategoriesStore.setCategories(data)
    })

    BrandsAPI.get().then(brands => {
      BrandsStore.setBrands(brands)
    })

    ProductsAPI.get().then(products => {
      console.log(products)
      ProductsStore.setProducts(products)
      ProductsStore.setSortedProducts(products)

    })

  //  fetchData
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      UserStore.setUser(user)
      OrderStore.fetchOrder(user)
    }
  }, [])



  return (

    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <AppRouter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
