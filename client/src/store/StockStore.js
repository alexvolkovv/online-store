import {makeAutoObservable} from "mobx";
import StockAPI from "../API/StockAPI";

class StockStore {
  constructor() {
    this._stocks = []
    this._changingStock = null
    makeAutoObservable(this)
  }

  get stocks() {
    return this._stocks
  }

  setStocks(newStocks) {
    this._stocks = newStocks
  }

  get changingStock() {
    return this._changingStock
  }

  setChangingStock(newStock) {
    this._changingStock = newStock
  }

  fetchStocks() {
    StockAPI.get().then(stocks => {
      this.setStocks(stocks)
    })
  }
}

export default new StockStore()