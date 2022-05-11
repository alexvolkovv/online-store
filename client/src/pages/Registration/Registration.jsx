import React, {useState} from 'react';
import styles from "../Login/Login.module.css";
import MyInput from "../../UI/MyInput/MyInput";
import {Link, useNavigate} from "react-router-dom";
import {PATH_LOGIN, PATH_REGISTRATION, PATH_SHOP} from "../../utils/Paths";
import MyButton from "../../UI/MyButton/MyButton";
import UserAPI from "../../API/UserAPI";
import UserStore from "../../store/UserStore";
import OrderAPI from "../../API/OrderAPI";
import OrderStore from "../../store/OrderStore";
import {Form} from "react-bootstrap";
import {isLoginCorrect, isPasswordNull} from "../../utils/RegistrationFunctions";

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const navigate = useNavigate()

  function isPasswordsEqual() {
    return password === secondPassword
  }

  function registration() {
    UserAPI.registration(email, password).then((user) => {
      if (user.error) {
        alert(user.error)
        return;
      }

      UserStore.setUser(user)
      OrderStore.fetchOrder(user)
      navigate(PATH_SHOP)
    })
  }

  return (
    <div className={styles.login}>
      <Form className={styles.form}>
        <h2 style={{textAlign: 'center'}}>Регистрация</h2>
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
        <MyInput
          type={'password'}
          placeholder={'Введите пароль второй раз'}
          value={secondPassword}
          onChange={(e) => {setSecondPassword(e.target.value)}}
          style={{marginTop: '10px'}}
        />
        <div className={styles.buttons}>
          <p>Уже есть аккаунт? {<Link to={PATH_LOGIN}>Авторизироваться</Link>}</p>
          <MyButton
            type={'submit'}
            onClick={(e) => {
              e.preventDefault()

              if (!isLoginCorrect(email)) {
                alert('Проверьте правильность введенного логина')
                return
              }

              if (!isPasswordsEqual()) {
                alert('Пароли не совпадают')
                return
              }

              if(isPasswordNull(password)) {
                alert('Введите пароль')
                return
              }

              registration()
            }}
          >
            Зарегистрироваться
          </MyButton>
        </div>

      </Form>
    </div>
  );
};

export default Registration;