import React, {useEffect} from "react";
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import UserStore from "./store/UserStore";
import CategoriesStore from "./store/CategoriesStore";
import BrandsStore from "./store/BrandsStore";
import ProductsStore from "./store/ProductsStore";
import OrderStore from "./store/OrderStore";

function App() {

  useEffect(() => {
    CategoriesStore.fetchCategories()
    BrandsStore.fetchBrands()
    ProductsStore.fetchProducts()


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
