import {makeAutoObservable} from "mobx";
import CategoriesAPI from "../API/CategoriesAPI";

class CategoriesStore {
  constructor() {
    this._categories = []
    this._changingCategory = null
    makeAutoObservable(this)
  }

  get categories() {
    return this._categories
  }

  setCategories(categories) {
    this._categories = categories
  }

  get changingCategory() {
    return this._changingCategory
  }

  setChangingCategory(category) {
    this._changingCategory = category
  }

  fetchCategories() {
    CategoriesAPI.get().then(data => {
      this.setCategories(data)
    })
  }
}

export default new CategoriesStore()