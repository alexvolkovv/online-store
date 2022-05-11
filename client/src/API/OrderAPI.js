import axios from "axios";
import {PATH_ALL_ORDERS, PATH_HOST} from "../utils/Paths";

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

  async changeProductCountInOrder(product, order) {
    const response = await axios.patch(PATH_HOST + '/api/order/', {
      product,
      order
    })

    return response.data
  }

  async confirmOrder(products, order) {
    const newOrder = await axios.post(PATH_HOST + '/api/order/confirm', {
      products,
      order
    })

    return newOrder.data
  }

  async getAllOrders(userId) {
    const allOrders = await axios.get(PATH_HOST + '/api/order/all/' + userId)

    console.log(allOrders.data)

    return allOrders.data
  }

  async changeOrderStatus(orderId, newStatus) {
    const changedOrder = await axios.patch(PATH_HOST + '/api/order/all/', {
      orderId,
      newStatus
    })

    return changedOrder.data
  }

  async getOrdersForAdmin() {
    const orders = await axios.get(PATH_HOST + '/api/admin/orders')

    console.log(orders.data)

    return orders.data
  }

  async getProductsFromOrder(orderId) {
    const products = await axios.get(PATH_HOST + '/api/order/products/' + orderId)

    return products.data
  }
}

export default new OrderAPI()