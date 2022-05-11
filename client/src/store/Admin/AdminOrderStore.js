import {makeAutoObservable} from "mobx";
import OrderAPI from "../../API/OrderAPI";

class AdminOrderStore {
  constructor() {
    this._orders = []
    this._sortedOrders = []
    makeAutoObservable(this)
  }

  get orders() {
    return this._orders
  }

  setOrders(orders) {
    this._orders = orders
  }

  get sortedOrders() {
    return this._sortedOrders
  }

  setSortedOrders(orders) {
    this._sortedOrders = orders
  }

  fetchOrders() {
     OrderAPI.getOrdersForAdmin().then(orders => {
      this.setOrders(orders)
      this.setSortedOrders(orders)
    })
  }
}

export default new AdminOrderStore()