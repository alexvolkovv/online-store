import {makeAutoObservable} from "mobx";
import UserAPI from "../API/UserAPI";

class UserStore {
  constructor() {
    this._user = null
    this._users = []
    this._changingUser = {}
    makeAutoObservable(this)
  }

  get user() {
    return this._user
  }

  setUser(newUser) {
    localStorage.setItem('user', JSON.stringify(newUser))
    this._user = newUser
  }

  get users() {
    return this._users
  }

  setUsers(newUsers) {
    this._users = newUsers
  }

  get changingUser() {
    return this._changingUser
  }

  setChangingUser(user) {
    this._changingUser = user
  }

  fetchUsers() {
    UserAPI.getAll(this.user.id).then(users => {
      this.setUsers(users)
    })
  }
}

export default new UserStore()