import {makeAutoObservable} from "mobx";

class BrandsStore {
  constructor() {
    this._brands = []
    makeAutoObservable(this)
  }

  get brands() {
    return this._brands
  }

  setBrands(brands) {
    this._brands = brands
  }
}

export default new BrandsStore()