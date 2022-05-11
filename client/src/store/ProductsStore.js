import {makeAutoObservable} from "mobx";
import ProductsAPI from "../API/ProductsAPI";

class ProductsStore {
  constructor() {
    this._products = []
    this._sortedProducts = []
    this._filter = {
      selectedSort: '',
      searchQuery: '',
      brand: null,
      category: null,
      priceFrom: '',
      priceTo: ''
    }
    this._allProducts = []
    this._changingProduct = null
    this._changingProductInfo = []
    this._changingProductLists = null
    this._changingFile = null
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

  get allProducts() {
    return this._allProducts
  }

  setAllProducts(products) {
    this._allProducts = products
  }

  fetchAllProducts() {

  }


  get changingProduct() {
    return this._changingProduct
  }

  setChangingProduct(product) {
    this._changingProduct = product
  }

  get changingProductInfo() {
    return this._changingProductInfo
  }

  setChangingProductInfo(productInfo) {
    this._changingProductInfo = productInfo
  }

  get changingProductLists() {
    return this._changingProductLists
  }

  setChangingProductLists(list) {
    this._changingProductLists = list
  }

  get changingFile() {
    return this._changingFile
  }

  setChangingFile(file) {
    this._changingFile = file
  }

  fetchProducts() {
    ProductsAPI.get({
      brand: null,
      category: null,
      priceFrom: '',
      priceTo: ''
    }).then(products => {
      this.setProducts(products)
      this.setSortedProducts(products)
    })
  }
}

export default new ProductsStore()