import React from 'react';
import styles from './NavBar.module.css'
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../../UI/MyButton/MyButton";
import {observer} from "mobx-react-lite";
import UserStore from "../../store/UserStore";
import userStore from "../../store/UserStore";
import {PATH_ADMIN, PATH_ALL_ORDERS, PATH_BASKET} from "../../utils/Paths";
import OrderStore from "../../store/OrderStore";

const NavBar = observer(() => {
  const navigate = useNavigate()

  return (
    <div className={styles.navbar}>
      <Link to={'/'}><h1>Эльборабо</h1></Link>
      <div className={styles.buttons}>
        {UserStore.user ?
          <div className="hide">
            {UserStore.user.email}
            {userStore.user?.role > 1 && <MyButton onClick={() => {navigate(PATH_ADMIN + '/' + 'orders')}}>Админ панель</MyButton>}
            <MyButton
              onClick={() => {
              navigate(PATH_BASKET)}
              }>Корзина ({OrderStore.orderedProducts.length})</MyButton>
            <MyButton onClick={() => {
              navigate(PATH_ALL_ORDERS + '/' + UserStore.user.id)
            }
            }>Заказы</MyButton>
            <MyButton onClick={() => {
              UserStore.setUser(null)
              navigate('/')
            }
            }>Выйти</MyButton>
          </div>
         :<MyButton onClick={() => {navigate('/login')}} >Авторизация</MyButton>
        }

      </div>
    </div>
  );
});

export default NavBar;