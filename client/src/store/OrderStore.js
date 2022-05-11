import {makeAutoObservable} from "mobx";
import OrderAPI from "../API/OrderAPI";

class OrderStore {
  constructor() {
    this._orderedProducts = []
    this._orders = []
    this._sortedOrders = []
    this._currentOrder = {}
    this._selectedOrders = null
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

  fetchAllOrders(userId) {
     return OrderAPI.getAllOrders(userId).then(allOrders => {
      this.setOrders(allOrders)
    })
  }

  get sortedOrders() {
    return this._sortedOrders
  }

  setSortedOrders(orders) {
    this._sortedOrders = orders
  }

  get selectedOrders() {
    return this._selectedOrders
  }

  setSelectedOrders(selectedOrders) {
    this._selectedOrders = selectedOrders
  }
}

export default new OrderStore()