import {makeAutoObservable} from "mobx";

class OrderStore {
  constructor() {
    this._orderedProducts = []
    this._orders = []
    this._currentOrder = {}
    makeAutoObservable(this)
  }

  get orderedProducts() {
    return this._orderedProducts
  }

  get orders() {
    return this._orders
  }

  get currentOrder() {
    return this._currentOrder
  }

  setOrderedProducts(products) {
    this._orderedProducts = products
  }

  setOrders(orders) {
    this._orders = orders
  }

  setCurrentOrder(order) {
    this._currentOrder = order
  }
}

export default new OrderStore()