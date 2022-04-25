import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class ProductsAPI {
  async get(body) {
    const brands = body?.brand_id ? `brand_id=${body?.brand_id}` : ''
    const categories = body?.category_id ? `category_id=${body?.category_id}` : ''
    const question = brands || categories ? '?' : ''
    const response = await axios.get(PATH_HOST + `/api/product?${brands}&${categories}`)

    return response.data
  }

  async getOne(id) {
    const response = await axios.get(PATH_HOST + `/api/product/${id}`)

    return response.data
  }

}

export default new ProductsAPI()