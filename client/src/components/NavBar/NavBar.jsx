import React from 'react';
import styles from './NavBar.module.css'
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../../UI/MyButton/MyButton";
import {observer} from "mobx-react-lite";
import UserStore from "../../store/UserStore";
import userStore from "../../store/UserStore";
import {PATH_BASKET} from "../../utils/Paths";
import OrderStore from "../../store/OrderStore";

const NavBar = observer(() => {
  const navigate = useNavigate()
  return (
    <div className={styles.navbar}>
      <Link to={'/'}><h1>Эльборабо</h1></Link>
      <div className={styles.buttons}>
        {UserStore.user ?
          <div className="hide">
            {userStore.user?.role === 2 && <MyButton>Админ панель</MyButton>}
            <MyButton
              onClick={() => {
              navigate(PATH_BASKET + '/' + UserStore.user.id)}
              }>Корзина ({OrderStore.orderedProducts.length})</MyButton>
            <MyButton>Заказы</MyButton>
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