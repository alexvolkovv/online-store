import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class ProductsAPI {
  async get(body) {
    const brands = body?.brand_id ? `brand_id=${body?.brand_id}` : ''
    const categories = body?.category_id ? `category_id=${body?.category_id}` : ''
    const priceFrom = `priceFrom=${body.priceFrom || 0}`
    const priceTo = `priceTo=${body.priceTo || 100000000000000000000}`

    const response = await axios.get(PATH_HOST + `/api/product?${brands}&${categories}&${priceFrom}&${priceTo}`)
    return response.data
  }

  async getOne(id) {
    const response = await axios.get(PATH_HOST + `/api/product/${id}`)

    return response.data
  }

  async getAll() {
    const response = await axios.get(PATH_HOST + `/api/product/all`)
    return response.data
  }

  async create(product) {
    const response = await axios.post(PATH_HOST + `/api/product/`, product)
    return response.data
  }

  async delete(productId) {
    const response = await axios.delete(PATH_HOST + `/api/product/${productId}`)
    return response.data
  }

  async update(productId, newData) {
    const response = await axios.post(PATH_HOST + `/api/product/update/${productId}`, newData)
    return response.data
  }

}

export default new ProductsAPI()