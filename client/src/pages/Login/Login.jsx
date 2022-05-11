import React, {useState} from 'react';
import styles from './Login.module.css'
import MyInput from "../../UI/MyInput/MyInput";
import {Link, useNavigate} from "react-router-dom";
import {PATH_REGISTRATION, PATH_SHOP} from "../../utils/Paths";
import MyButton from "../../UI/MyButton/MyButton";
import UserAPI from "../../API/UserAPI";
import UserStore from "../../store/UserStore";
import OrderAPI from "../../API/OrderAPI";
import OrderStore from "../../store/OrderStore";
import {isLoginCorrect, isPasswordNull} from "../../utils/RegistrationFunctions";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function login() {
    UserAPI.login(email, password)
      .then(user => {
        if (user.error) {
          alert(user.error)
          return;
        }

        UserStore.setUser(user)
        OrderStore.fetchOrder(user)
        navigate(PATH_SHOP)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div className={styles.login}>
      <form className={styles.form}>
        <h2 style={{textAlign: 'center'}}>Авторизация</h2>
        <MyInput
          type={'text'}
          placeholder={'Введите ваш email'}
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <MyInput
          type={'password'}
          placeholder={'Введите ваш пароль'}
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          style={{marginTop: '10px'}}
        />
        <div className={styles.buttons}>
          <p>Нету аккаунта? {<Link to={PATH_REGISTRATION}>Зарегистрироваться</Link>}</p>
          <MyButton type={'submit'}
            onClick={(e) => {
              e.preventDefault()

              if (!isLoginCorrect(email)) {
                alert('Проверьте правильность введенного логина')
                return
              }

              if(isPasswordNull(password)) {
                alert('Введите пароль')
                return
              }
              login()
            }
          }
          >
            Войти
          </MyButton>
        </div>

      </form>
    </div>
  );
};

export default Login;