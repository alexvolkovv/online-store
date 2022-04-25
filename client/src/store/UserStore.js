import {makeAutoObservable} from "mobx";

class UserStore {
  constructor() {
    this._user = null
    makeAutoObservable(this)
  }

  get user() {
    return this._user
  }

  setUser(newUser) {
    localStorage.setItem('user', JSON.stringify(newUser))
    this._user = newUser
  }
}

export default new UserStore()