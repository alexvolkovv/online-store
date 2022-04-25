import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class OrderAPI {
  async getOne(id) {
    const response = await axios.get(PATH_HOST + '/api/order/' + id)

    return response.data
  }

  async addProductToOrder(product, order) {
    const response = await axios.post(PATH_HOST + '/api/order/', {
      product,
      order
    })

    return response.data
  }

  async deleteProductFromOrder(product, order) {
    const response = await axios.delete(PATH_HOST + '/api/order/', {
      data: {
        product,
        order
      }
    })

    return response.data
  }

  async changeProductFromOrder(product, order) {
    const response = await axios.post(PATH_HOST + '/api/order/')

    return response.data
  }
}

export default new OrderAPI()