import {makeAutoObservable} from "mobx";
import SupplyAPI from "../API/SupplyAPI";

class SuppliesStore {
  constructor() {
    this._supplies = []
    this._changinSupply = {}
    this._changingSupplyInfo = {}
    this._changingSupplyProducts = []
    makeAutoObservable(this)
  }

  get supplies() {
    return this._supplies
  }

  setSupplies(newSupplies) {
    this._supplies = newSupplies
  }

  get changingSupply() {
    return this._changinSupply
  }

  setChangingSupply(newSupply) {
    this._changinSupply = newSupply
  }

  get changingSupplyInfo() {
    return this._changingSupplyInfo
  }

  setChangingSupplyInfo(changingSupplyInfo) {
    this._changingSupplyInfo = changingSupplyInfo
  }

  get changingSupplyProducts() {
    return this._changingSupplyProducts
  }

  setChangingSupplyProducts(changingSupplyProducts) {
    this._changingSupplyProducts = changingSupplyProducts
  }

  fetchSupplies() {
    SupplyAPI.getAll().then(supplies => {
      this.setSupplies(supplies)
    })
  }
}

export default new SuppliesStore()