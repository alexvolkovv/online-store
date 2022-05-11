import AdminOrders from "../pages/Admin/Orders/AdminOrders";
import AdminProducts from "../pages/Admin/Products/AdminProducts";
import AdminSupplies from "../pages/Admin/Supplies/AdminSupplies";
import AdminBrands from "../pages/Admin/Brands/AdminBrands";
import AdminCategories from "../pages/Admin/Categories/AdminCategories";
import AdminCharacteristics from "../pages/Admin/Characteristics/AdminCharacteristics";
import AdminStocks from "../pages/Admin/Stocks/AdminStocks";
import AdminStatuses from "../pages/Admin/Statuses/AdminStatuses";
import AdminUsers from "../pages/Admin/Users/AdminUsers";
import AdminSupplier from "../pages/Admin/Suppliers/AdminSupplier";
import Reporting from "../pages/Admin/Reporting/Reporting";

export const adminLinks = [
  {
    name: 'Заказы',
    path: '/orders',
    element: <AdminOrders/>
  },
  {
    name: 'Товары',
    path: '/products',
    element: <AdminProducts/>

  },
  {
    name: 'Поставки',
    path: '/supplies',
    element: <AdminSupplies/>

  },
  {
    name: 'Бренды',
    path: '/brands',
    element: <AdminBrands/>

  },
  {
    name: 'Категории',
    path: '/categories',
    element: <AdminCategories/>

  },
  {
    name: 'Характеристики',
    path: '/characteristics',
    element: <AdminCharacteristics/>

  },
  {
    name: 'Склады',
    path: '/stocks',
    element: <AdminStocks/>

  },
  {
    name: 'Статусы',
    path: '/statuses',
    element: <AdminStatuses/>

  },

  {
    name: 'Поставщики',
    path: '/suppliers',
    element: <AdminSupplier/>
  }
]

export const mainAdminLinks = [
  {
    name: 'Пользователи',
    path: '/users',
    element: <AdminUsers/>
  },
  {
    name: 'Отчетность',
    path: '/reporting',
    element: <Reporting/>
  },
]

