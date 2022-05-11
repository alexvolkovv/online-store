import {makeAutoObservable} from "mobx";
import SupplierAPI from "../API/SupplierAPI";

class SupplierStore {
  constructor() {
    this._suppliers = []
    this._changingSupplier = null
    makeAutoObservable(this)
  }

  get suppliers() {
    return this._suppliers
  }

  setSuppliers(suppliers) {
    this._suppliers= suppliers
  }

  get changingSupplier() {
    return this._changingSupplier
  }

  setChangingSupplier(changingSupplier) {
    this._changingSupplier = changingSupplier
  }

  fetchSuppliers() {
    SupplierAPI.get().then(suppliers => {
      this.setSuppliers(suppliers)
    })
  }
}

export default new SupplierStore()