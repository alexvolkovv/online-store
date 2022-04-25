import {makeAutoObservable} from "mobx";
import OrderAPI from "../API/OrderAPI";

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

  fetchOrder(user) {
    OrderAPI.getOne(user.id).then(data => {
      this.setCurrentOrder(data.order)
      this.setOrderedProducts(data.products)
    })
  }
}

export default new OrderStore()