import {makeAutoObservable} from "mobx";

class ProductsStore {
  constructor() {
    this._products = []
    this._sortedProducts = []
    this._filter = {
      selectedSort: '',
      searchQuery: '',
      brand: null,
      category: null
    }
    makeAutoObservable(this)
  }

  get products() {
    return this._products
  }

  setProducts(products) {
    this._products = products
  }

  get sortedProducts() {
    return this._sortedProducts
  }

  setSortedProducts(sortedProducts) {
    this._sortedProducts = sortedProducts
  }

  get filter() {
    return this._filter
  }

  setFilter(filter) {
    this._filter = filter
  }
}

export default new ProductsStore()