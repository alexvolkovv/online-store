import React from 'react';
import {Button, Modal} from "react-bootstrap";
import UserStore from "../../store/UserStore";
import UserAPI from "../../API/UserAPI";
import userStore from "../../store/UserStore";

const ChangeUser = (props) => {
  const {show, onHide} = props
  const isUser = UserStore.changingUser.role === 1

  function okClick() {
    const newRole = isUser ? 2 : 1

    UserAPI.changeRole(userStore.changingUser.id, newRole).then(data => {
      userStore.fetchUsers()
      onHide()
    })
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{UserStore.changingUser.email}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{isUser ?
        `Выдать админ права пользователю ${UserStore.changingUser.email}?` :
        `Забрать админ права пользователю ${UserStore.changingUser.email}?`
      }</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="primary" onClick={okClick}>
          Ок
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeUser;