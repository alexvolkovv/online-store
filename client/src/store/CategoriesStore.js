import {makeAutoObservable} from "mobx";

class CategoriesStore {
  constructor() {
    this._categories = []
    makeAutoObservable(this)
  }

  get categories() {
    return this._categories
  }

  setCategories(categories) {
    this._categories = categories
  }
}

export default new CategoriesStore()