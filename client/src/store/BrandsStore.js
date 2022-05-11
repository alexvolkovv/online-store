import {makeAutoObservable} from "mobx";
import BrandsAPI from "../API/BrandsAPI";

class BrandsStore {
  constructor() {
    this._brands = []
    this._changingBrand = null
    makeAutoObservable(this)
  }

  get brands() {
    return this._brands
  }

  setBrands(brands) {
    this._brands = brands
  }

  get changingBrand() {
    return this._changingBrand
  }

  setChangingBrand(brand) {
    this._changingBrand = brand
  }

  fetchBrands() {
    BrandsAPI.get().then(brands => {
      this.setBrands(brands)
    })
  }
}

export default new BrandsStore()